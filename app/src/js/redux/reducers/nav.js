const initialState = {
  isOpen: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_MOBILE_HEADER':
      return Object.assign({}, state, {
        isOpen: !state.isOpen
      })
    default:
      return state
  }
}
