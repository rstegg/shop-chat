const initialState = {
  isOpen: false,
  isFetching: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_PURCHASE_WINDOW':
      return Object.assign({}, state, {
        isOpen: true
      })
    case 'CLOSE_PURCHASE_WINDOW':
      return Object.assign({}, state, {
        isOpen: false
      })
    default:
      return state
  }
}
