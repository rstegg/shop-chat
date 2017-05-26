const initialState = {
  isOpen: false,
  isFetching: null,
  focused: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_ADD_BANK':
      return Object.assign({}, state, {
        isOpen: true
      })
    case 'SET_FOCUSED_BANK_FIELD':
      return Object.assign({}, state, {
        focused: action.payload.field
      })
    case 'ON_ADD_CREDIT_BANK_FORM_CHANGE':
      return Object.assign({}, state, {
        [action.payload.field]: action.payload.value
      })
    case 'CLOSE_ADD_BANK':
      return initialState
    default:
      return state
  }
}
