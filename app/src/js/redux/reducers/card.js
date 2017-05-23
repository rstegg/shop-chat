const initialState = {
  isOpen: false,
  isFetching: null,
  focused: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_ADD_CARD':
      return Object.assign({}, state, {
        isOpen: true
      })
    case 'SET_FOCUSED_CARD_FIELD':
      return Object.assign({}, state, {
        focused: action.payload.field
      })
    case 'ON_ADD_CREDIT_CARD_FORM_CHANGE':
      return Object.assign({}, state, {
        [action.payload.field]: action.payload.value
      })
    case 'CLOSE_ADD_CARD':
      return initialState
    default:
      return state
  }
}
