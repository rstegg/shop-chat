export const createBraintreeCard = (card, user) =>
({
  type: 'CREATE_BRAINTREE_CARD',
  payload: {
    card,
    token: user.token
  }
})

export const onAddBraintreeCardSuccess = res =>
({
  type: 'CREATE_BRAINTREE_CARD_SUCCESS',
  payload: {
    braintree_card: res.body.braintree_card
  }
})

export const createBraintreeBank = (bank, user) =>
({
  type: 'CREATE_BRAINTREE_BANK',
  payload: {
    bank,
    token: user.token
  }
})
