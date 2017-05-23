export const openAddCard = () =>
({
  type: 'OPEN_ADD_CARD'
})

export const closeAddCard = () =>
({
  type: 'CLOSE_ADD_CARD'
})

export const setFocusedCardField = field =>
({
  type: 'SET_FOCUSED_CARD_FIELD',
  payload: {
    field
  }
})

export const onAddCreditCardFormChange = (field, value) =>
({
  type: 'ON_ADD_CREDIT_CARD_FORM_CHANGE',
  payload: {
    field,
    value
  }
})
