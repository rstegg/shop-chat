const initialState = {
  current: {},
  new: {
    name: '',
    is_public: false
  },
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
        new: {
          ...initialState.new,
          isCreated: true
        }
      })
    case 'EDIT_PRODUCT_FIELD':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          focused: action.payload.field
        }
      })
    case 'EDIT_PRODUCT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          focused: null
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
