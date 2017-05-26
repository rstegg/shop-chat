import su from 'superagent'
import { Observable } from 'rxjs/Rx'

import BraintreeClient from 'braintree-web/client'

const API_HOST = '/api/v1'

//TODO: get client auth token from server

const api = {
  createBraintreeInstance: () => {
    const request =
      BraintreeClient.create({
        authorization: 'CLIENT_AUTHORIZATION'
      })
      return Observable.fromPromise(request)
    },
    braintreeCardRequest: (clientInstance, {card}) => {
      const request =
        clientInstance.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data: {
            creditCard: {
              number: card.number,
              expirationDate: card.expiration,
              cvv: card.cvv,
              billingAddress: {
                postalCode: card.postalCode,
              }
            }
          }
        })
      return Observable.fromPromise(request)
    },
    sendCardResponseToServer: (btResponse, user) => {
      const request =
       su.post(`${API_HOST}/braintree/cards`)
        .send({btResponse})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  }
}

export const braintreeCardRequest = action$ =>
  action$.ofType('CREATE_BRAINTREE_CARD')
    .mergeMap(action =>
      api.createBraintreeInstance()
        .map((err, clientInstance) => {
          console.log(clientInstance);
          return api.createCardRequest(clientInstance, action.payload)
        }).map((err, response) => {
          console.log(response);
          api.sendCardResponseToServer(response, action.payload)
        })
        .catch(error => Observable.of({
          type: 'CREATE_BRAINTREE_CARD_FAILURE',
          error
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
