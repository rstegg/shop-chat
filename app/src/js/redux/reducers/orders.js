const initialState = {
  cart: [],
  isOpen: false,
  isFetching: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'OPEN_PURCHASE_WINDOW':
    return Object.assign({}, state, {
      isOpen: true
    })
  case 'CLOSE_PURCHASE_WINDOW':
    return Object.assign({}, state, {
      isOpen: false
    })
  case 'PRODUCT_BUY_NOW':
  case 'PRODUCT_ADD_TO_CART':
    return Object.assign({}, state, {
      cart: [ ...state.cart, action.payload.product ]
    })
  case 'PRODUCT_REMOVE_FROM_CART':
    return Object.assign({}, state, {
      cart: [ ...state.cart.slice(0, state.cart.indexOf(action.payload.product)), ...state.cart.slice(state.cart.indexOf(action.payload.product) + 1) ]
    })
  default:
    return state
  }
}
