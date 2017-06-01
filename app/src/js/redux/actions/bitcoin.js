export const openAddBitcoin = () =>
({
  type: 'OPEN_ADD_BITCOIN'
})

export const closeAddBitcoin = () =>
({
  type: 'CLOSE_ADD_BITCOIN'
})

export const setFocusedBitcoinField = field =>
({
  type: 'SET_FOCUSED_BITCOIN_FIELD',
  payload: {
    field
  }
})

export const onAddBitcoinFormChange = (field, value) =>
({
  type: 'ON_ADD_BITCOIN_FORM_CHANGE',
  payload: {
    field,
    value
  }
})
