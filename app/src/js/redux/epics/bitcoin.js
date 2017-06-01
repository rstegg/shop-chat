import {
  onFetchBitcoinAddressesSuccess,
  onAddBitcoinAddressSuccess,
  // onCreateBitcoinAddressSuccess
} from 'actions/bitcoin'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  addBitcoinAddress: (bitcoin_address, user) => {
    const request =
      su.post(`${API_HOST}/bitcoin/address`)
        .send({bitcoin_address})
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
  fetchBitcoinAddresses: ({user}) => {
    const request =
      su.get(`${API_HOST}/bitcoin/addresses`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)

    return Observable.fromPromise(request)
  },
}

export const fetchBitcoinAddresses = action$ =>
  action$.ofType('FETCH_BITCOIN_ADDRESSES')
    .mergeMap(action =>
      api.fetchStripeCards(action.payload)
        .map(onFetchStripeCardsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_CARDS_FAILURE',
          error
        }))
    )

export const addBitcoinAddress = action$ =>
  action$.ofType('ADD_BITCOIN_ADDRESS')
    .mergeMap(action =>
      api.addBitcoinAddress(action.payload)
        .map(onFetchStripeCardsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STRIPE_CARDS_FAILURE',
          error
        }))
    )

export const addStripeBank = action$ =>
  action$.ofType('ADD_STRIPE_BANK')
    .mergeMap(action =>
      api.addStripeBank(action.payload)
        .map((status, response) =>
          onAddStripeBankSuccess(status, response, action.payload.user)
        )
        .catch(error => Observable.of({
          type: 'ADD_STRIPE_BANK_FAILURE'
        }))
    )
