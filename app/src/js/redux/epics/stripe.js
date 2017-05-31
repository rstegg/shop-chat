import { onFetchStripeCardsSuccess, onCreateStripeCardSuccess, onCreateStripeBankSuccess } from '../actions/stripe'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const Stripe = window.Stripe

const API_HOST = '/api/v1'

const api = {
  createStripeBank: ({ bank: { routing_number, account_number, account_holder_name, account_holder_type }, user }) => {
    const request =
      Observable.bindCallback(
        Stripe.bankAccount.createToken,
        (status, response) => ({ status, response })
      )
      return request({ country: 'US', currency: 'USD', routing_number, account_number, account_holder_name, account_holder_type })
  },
  createStripeCard: ({ card: { number, cvc, expirationDate } }) => {
    const request =
      Observable.bindCallback(
        Stripe.card.createToken,
        (status, response) => ({ status, response })
      )
      const exp_month = expirationDate.split('/')[0]
      const exp_year = expirationDate.split('/')[1]
      return request({ number, cvc, exp_month, exp_year })
  },
  sendCardResponseToServer: (stripeResponse, user) => {
    const request =
      su.post(`${API_HOST}/stripe/cards`)
        .send({stripeResponse})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  fetchStripeCards: ({user}) => {
    const request =
      su.get(`${API_HOST}/stripe/cards`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
}

export const fetchStripeCards = action$ =>
  action$.ofType('FETCH_STRIPE_CARDS')
    .mergeMap(action =>
      api.fetchStripeCards(action.payload)
        .map(onFetchStripeCardsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_CARDS_FAILURE',
          error
        }))
    )

export const createStripeCard = action$ =>
  action$.ofType('CREATE_STRIPE_CARD')
    .mergeMap(action =>
      api.createStripeCard(action.payload)
        .mergeMap(({status, response}) =>
          response.error ? { type: 'CREATE_STRIPE_CARD_FAILURE', error: response.error }
          : api.sendCardResponseToServer(response, action.payload.user)
              .map(onCreateStripeCardSuccess)
              .catch(error => Observable.of({
                type: 'ADD_STRIPE_CARD_FAILURE',
                error
              }))
            )
    )

export const createStripeBank = action$ =>
  action$.ofType('CREATE_STRIPE_BANK')
    .mergeMap(action =>
      api.createStripeBank(action.payload)
        .map((status, response) =>
          onCreateStripeBankSuccess(status, response, action.payload.user)
        )
        .catch(error => Observable.of({
          type: 'CREATE_STRIPE_BANK_FAILURE'
        }))
    )
