export const fetchStripeCards = user =>
({
  type: 'FETCH_STRIPE_CARDS',
  payload: {
    user
  }
})

export const onFetchStripeCardsSuccess = res =>
({
  type: 'FETCH_STRIPE_CARD_SUCCESS',
  payload: {
    stripe_cards: res.body.stripe_cards
  }
})

export const createStripeCard = (card, user) =>
({
  type: 'CREATE_STRIPE_CARD',
  payload: {
    card,
    user
  }
})

export const onCreateStripeCardSuccess = stripe_card =>
({
  type: 'CREATE_STRIPE_CARD_SUCCESS',
  payload: {
    stripe_card
  }
})

export const createStripeBank = (bank, user) =>
({
  type: 'CREATE_STRIPE_BANK',
  payload: {
    bank,
    user
  }
})

export const onCreateStripeBankSuccess = stripe_bank =>
({
  type: 'CREATE_STRIPE_BANK_SUCCESS',
  payload: {
    stripe_bank
  }
})
