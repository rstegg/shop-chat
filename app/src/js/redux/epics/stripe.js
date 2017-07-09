import { combineEpics } from 'redux-observable'
import {
  onFetchStripeCardsSuccess,
  onFetchStripeBanksSuccess,
  onFetchStripeBitcoinsSuccess,
  onAddStripeCardSuccess,
  onAddStripeBankSuccess,
  onAddStripeBitcoinSuccess,
} from 'actions/stripe'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const Stripe = window.Stripe

const API_HOST = '/api/v1'

const api = {
  fetchStripeCards: ({user}) => {
    const request =
      su.get(`${API_HOST}/stripe/cards`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  fetchStripeBanks: ({user}) => {
    const request =
      su.get(`${API_HOST}/stripe/banks`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  fetchStripeBitcoins: ({user}) => {
    const request =
      su.get(`${API_HOST}/stripe/bitcoins`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  addStripeBank: ({ bank: { routing_number, account_number, account_holder_name }, user }) => {
    const request =
      Observable.bindCallback(
        Stripe.bankAccount.createToken,
        (status, response) => ({ status, response })
      )
      return request({ country: 'US', currency: 'USD', routing_number, account_number, account_holder_name, account_holder_type: 'individual' })
  },
  addStripeCard: ({ card: { number, cvc, expirationDate } }) => {
    const request =
      Observable.bindCallback(
        Stripe.card.createToken,
        (status, response) => ({ status, response })
      )
      const exp_month = expirationDate.split('/')[0]
      const exp_year = expirationDate.split('/')[1]
      return request({ currency: 'USD', number, cvc, exp_month, exp_year })
  },
  addStripeBitcoin: ({ bitcoin: { amount, email } }) => {
    const request =
      Observable.bindCallback(
        Stripe.source.create,
        (status, response) => ({ status, response })
      )
      return request({ type: 'bitcoin', currency: 'USD', amount, owner: { email } })
  },
  sendCardResponseToServer: (stripeResponse, user) => {
    const request =
      su.post(`${API_HOST}/stripe/cards`)
        .send({stripeResponse})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  sendBankResponseToServer: (stripeResponse, user) => {
    const request =
      su.post(`${API_HOST}/stripe/banks`)
        .send({stripeResponse})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  sendBitcoinResponseToServer: (stripeResponse, user) => {
    const request =
      su.post(`${API_HOST}/stripe/bitcoins`)
        .send({stripeResponse})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
}

const fetchStripeCards = action$ =>
  action$.ofType('FETCH_STRIPE_CARDS')
    .mergeMap(action =>
      api.fetchStripeCards(action.payload)
        .map(onFetchStripeCardsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_CARDS_FAILURE',
          error
        }))
    )

const addStripeCard = action$ =>
  action$.ofType('ADD_STRIPE_CARD')
    .mergeMap(action =>
      api.addStripeCard(action.payload)
        .mergeMap(({status, response}) =>
          response.error ? Observable.of({ type: 'ADD_STRIPE_CARD_FAILURE', error: response.error })
          : api.sendCardResponseToServer(response, action.payload.user)
              .map(onAddStripeCardSuccess)
              .catch(error => Observable.of({
                type: 'ADD_STRIPE_CARD_FAILURE',
                error
              }))
            )
    )

const fetchStripeBanks = action$ =>
  action$.ofType('FETCH_STRIPE_BANKS')
    .mergeMap(action =>
      api.fetchStripeBanks(action.payload)
        .map(onFetchStripeBanksSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_BANKS_FAILURE',
          error
        }))
    )

const addStripeBank = action$ =>
  action$.ofType('ADD_STRIPE_BANK')
    .mergeMap(action =>
      api.addStripeBank(action.payload)
        .mergeMap(({status, response}) =>
          response.error ? Observable.of({ type: 'ADD_STRIPE_BANK_FAILURE', error: response.error })
          : api.sendBankResponseToServer(response, action.payload.user)
              .map(onAddStripeBankSuccess)
              .catch(error => Observable.of({
                type: 'ADD_STRIPE_BANK_FAILURE',
                error
              }))
            )
    )

const fetchStripeBitcoins = action$ =>
  action$.ofType('FETCH_STRIPE_BITCOINS')
    .mergeMap(action =>
      api.fetchStripeBitcoins(action.payload)
        .map(onFetchStripeBitcoinsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_BITCOINS_FAILURE',
          error
        }))
    )

const addStripeBitcoin = action$ =>
  action$.ofType('ADD_STRIPE_BITCOIN')
    .mergeMap(action =>
      api.addStripeBitcoin(action.payload)
        .map(onAddStripeBitcoinSuccess)
        .catch(error => Observable.of({
          type: 'ADD_STRIPE_BITCOIN_FAILURE',
          error
        }))
    )

// const addStripeBitcoin = action$ =>
//   action$.ofType('ADD_STRIPE_BITCOIN')
//     .mergeMap(action =>
//       api.addStripeBitcoin(action.payload)
//         .mergeMap(({status, response}) =>
//           response.error ? Observable.of({ type: 'ADD_STRIPE_BITCOIN_FAILURE', error: response.error })
//           : api.sendBitcoinResponseToServer(response, action.payload.user)
//               .map(onAddStripeBitcoinSuccess)
//               .catch(error => Observable.of({
//                 type: 'ADD_STRIPE_BITCOIN_FAILURE',
//                 error
//               }))
//             )
//     )

export default combineEpics(
  fetchStripeCards,
  addStripeCard,
  fetchStripeBanks,
  addStripeBank,
  fetchStripeBitcoins,
  addStripeBitcoin,
  addStripeBitcoin
)
