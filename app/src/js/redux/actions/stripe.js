/* eslint camelcase: 0 */

// FETCHING

export const fetchStripeCards = user =>
({
  type: 'FETCH_STRIPE_CARDS',
  payload: {
    user
  }
})

export const onFetchStripeCardsSuccess = res =>
({
  type: 'FETCH_STRIPE_CARDS_SUCCESS',
  payload: {
    stripeCards: res.body.stripeCards
  }
})

export const fetchStripeBanks = user =>
({
  type: 'FETCH_STRIPE_BANKS',
  payload: {
    user
  }
})

export const onFetchStripeBanksSuccess = res =>
({
  type: 'FETCH_STRIPE_BANKS_SUCCESS',
  payload: {
    stripeBanks: res.body.stripeBanks
  }
})

export const fetchStripeBitcoins = user =>
({
  type: 'FETCH_STRIPE_BITCOINS',
  payload: {
    user
  }
})

export const onFetchStripeBitcoinsSuccess = res =>
({
  type: 'FETCH_STRIPE_BITCOINS_SUCCESS',
  payload: {
    bitcoins: res.body.bitcoins
  }
})

// ADDING

export const addStripeCard = (card, user) =>
({
  type: 'ADD_STRIPE_CARD',
  payload: {
    card,
    user
  }
})

export const onAddStripeCardSuccess = res =>
({
  type: 'ADD_STRIPE_CARD_SUCCESS',
  payload: {
    stripe_card: res.body.stripe_card
  }
})

export const addStripeBank = (bank, user) =>
({
  type: 'ADD_STRIPE_BANK',
  payload: {
    bank,
    user
  }
})

export const onAddStripeBankSuccess = res =>
({
  type: 'ADD_STRIPE_BANK_SUCCESS',
  payload: {
    stripe_bank: res.body.stripe_bank
  }
})

export const addStripeBitcoin = (bitcoin, user) =>
({
  type: 'ADD_STRIPE_BITCOIN',
  payload: {
    bitcoin,
    user
  }
})

export const onAddStripeBitcoinSuccess = res =>
({
  type: 'ADD_STRIPE_BITCOIN_SUCCESS',
  payload: {
    stripe_bitcoin: res.response
  }
})
