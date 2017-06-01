export const openAddBank = () =>
({
  type: 'OPEN_ADD_BANK'
})

export const closeAddBank = () =>
({
  type: 'CLOSE_ADD_BANK'
})

export const openWithdrawBank = () =>
({
  type: 'OPEN_WITHDRAW_BANK'
})

export const closeWithdrawBank = () =>
({
  type: 'CLOSE_WITHDRAW_BANK'
})

export const setFocusedBankField = field =>
({
  type: 'SET_FOCUSED_BANK_FIELD',
  payload: {
    field
  }
})

export const onAddBankFormChange = (field, value) =>
({
  type: 'ON_ADD_BANK_FORM_CHANGE',
  payload: {
    field,
    value
  }
})
