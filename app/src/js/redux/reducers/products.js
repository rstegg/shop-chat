const initialState = {
  current: {},
  new: {},
  list: [],
  fetchable: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_PRODUCTS':
      return Object.assign({}, state, {
        fetchable: false
      })
    case 'FETCH_PRODUCTS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.products
      })
    case 'CREATE_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.product],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'EDIT_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isEdited: true
        }
      })
    case 'DELETE_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image,
      })
    case 'FETCH_SINGLE_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.product
      })
    case 'SET_CURRENT_PRODUCT':
      return Object.assign({}, state, {
        current: action.payload.product
      })
    case 'REFRESH_PRODUCTS':
      return initialState
    case 'FETCH_PRODUCTS_FAILURE':
    case 'FETCH_SINGLE_PRODUCT_FAILURE':
    case 'CREATE_PRODUCT_FAILURE':
    case 'EDIT_PRODUCT_FAILURE':
    case 'UPLOAD_PRODUCT_IMAGE_FAILURE':
    default:
      return state
  }
}
