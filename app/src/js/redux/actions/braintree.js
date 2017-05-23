export const createBraintreeCard = (card, user) =>
({
  type: 'CREATE_BRAINTREE_CARD',
  payload: {
    card,
    token: user.token
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
