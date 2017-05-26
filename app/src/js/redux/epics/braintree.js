import { onAddBraintreeCardSuccess } from 'actions/braintree'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

import BraintreeClient from 'braintree-web/client'

const API_HOST = '/api/v1'

//TODO: get client auth token from server

const api = {
  getClientToken: ({token}) => {
    const request =
      su.get(`${API_HOST}/bt_client_token`)
       .set('Accept', 'application/json')
       .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createBraintreeInstance: response => {
    const request =
      BraintreeClient.create({
        authorization: response.body.bt_client_token
      })

    return Observable.fromPromise(request) //TODO: ??? HALP BINDPROMISE???
  },
  createBraintreeCardRequest: (clientInstance, {card}) => {
    const request =
      clientInstance.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          creditCard: {
            number: card.number,
            expirationDate: card.expirationDate,
            cvv: card.cvv,
            billingAddress: {
              postalCode: card.postalCode,
            }
          }
        }
      })
    return Observable.fromPromise(request)
  },
  sendCardResponseToServer: (btResponse, {token}) => {
    const request =
      su.post(`${API_HOST}/braintree/cards`)
        .send({btResponse})
        .set('Accept', 'application/json')
        .set('Authorization', token)

    return Observable.fromPromise(request)
  }
}

export const braintreeCardRequest = action$ =>
  action$.ofType('CREATE_BRAINTREE_CARD')
    .mergeMap(action =>
      api.getClientToken(action.payload)
        .mergeMap(response => api.createBraintreeInstance(response))
        .mergeMap(clientInstance => api.createBraintreeCardRequest(clientInstance, action.payload))
        .mergeMap(response =>
          api.sendCardResponseToServer(response, action.payload)
            .map(onAddBraintreeCardSuccess)
            .catch(error => Observable.of({
              type: 'CREATE_BRAINTREE_CARD_FAILURE',
              error
            }))
        )
        .catch(error => Observable.of({
          type: 'CREATE_BRAINTREE_CARD_FAILURE',
          error: error.response.req.text
        }))
    )

// export const braintreeBankRequest = action$ =>
//   action$.ofType('CREATE_BRAINTREE_BANK')
//     .mergeMap(action =>
//       api.createBraintreeInstance()
//         .map((err, clientInstance) => //TODO: check for err
//           api.createBankRequest(clientInstance, action.payload)
//         ).map((err, response) =>
//           api.sendBankResponseToServer(response, action.payload)
//         )
//         .catch(error => Observable.of(
//           onCreateCardFailure(error.response.text)
//         ))
//     )
