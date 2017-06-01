const initialState = {
  list: [],
  isOpen: false,
  isFetching: null,
  focused: null,
  name: '',
  number: '',
  expirationDate: '',
  cvv: '',
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_STRIPE_CARDS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.stripe_cards
      })
    case 'ADD_STRIPE_CARD_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.stripe_card]
      })
    case 'SET_FOCUSED_CARD_FIELD':
      return Object.assign({}, state, {
        focused: action.payload.field
      })
    case 'ON_ADD_CREDIT_CARD_FORM_CHANGE':
      return Object.assign({}, state, {
        [action.payload.field]: action.payload.value
      })
    case 'OPEN_ADD_CARD':
      return Object.assign({}, state, {
        isOpen: true
      })
    case 'CLOSE_ADD_CARD':
      return initialState
    default:
      return state
  }
}
