import { onLoginSuccess, onLoginFailure } from 'actions/checkout'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

import BraintreeClient from 'braintree-web/client'

const API_HOST = '/api/v1'

const api = {
  createBraintreeInstance: ({number, expirationDate, cvv, postalCode}) => {
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
    sendCardResponseToServer: (btResponse, {token}) => {
      const request =
       su.post(`${API_HOST}/braintree/cards`)
        .send({btResponse, payload})
        .set('Accept', 'application/json')
        .set('Authorization', )
    return Observable.fromPromise(request)
  }
}

export const braintreeCardRequest = action$ =>
  action$.ofType('CREATE_BRAINTREE_CARD')
    .mergeMap(action =>
      api.createBraintreeInstance()
        .map((err, clientInstance) => //TODO: check for err
          api.createCardRequest(clientInstance, action.payload)
        ).map((err, response) =>
          api.sendCardResponseToServer(response, action.payload)
        )
        .catch(error => Observable.of(
          onCreateCardFailure(error.response.text)
        ))
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
