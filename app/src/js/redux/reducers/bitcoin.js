const initialState = {
  list: [],
  isOpen: false,
  isWithdrawOpen: false,
  isFetching: null,
  focused: null,
  amount: '',
  email: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_STRIPE_BITCOINS_SUCCESS':
    return Object.assign({}, state, {
      list: action.payload.bitcoin_addresses
    })
  case 'ADD_STRIPE_BITCOIN_SUCCESS':
    return Object.assign({}, state, {
      list: [ ...state.list, action.payload.stripe_bitcoin ]
    })
  case 'SET_FOCUSED_BITCOIN_FIELD':
    return Object.assign({}, state, {
      focused: action.payload.field
    })
  case 'ON_ADD_BITCOIN_FORM_CHANGE':
    return Object.assign({}, state, {
      [action.payload.field]: action.payload.value
    })
  case 'OPEN_WITHDRAW_BITCOIN':
    return Object.assign({}, state, {
      isWithdrawOpen: true
    })
  case 'OPEN_ADD_BITCOIN':
    return Object.assign({}, state, {
      isOpen: true
    })
  case 'CLOSE_WITHDRAW_BITCOIN':
  case 'CLOSE_ADD_BITCOIN':
    return initialState
  default:
    return state
  }
}
