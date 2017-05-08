import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  current: {},
  new: {},
  list: [],
  free: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_FREE_PRODUCT':
      return Object.assign({}, state, {
        free: {
          ...action.payload.product,
          isSaved: true
        }
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
        },
        free: initialState.free
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
    case 'UPLOAD_FREE_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        free: {
          ...state.free,
          image: action.payload.image
        }
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
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new,
        free: initialState.free,
      })
    case REHYDRATE:
      const incoming = action.payload.products
      if(incoming) {
        return Object.assign({}, state, {
          free: action.payload.products.free
        })
      }
      return state
    case 'FETCH_PRODUCTS_FAILURE':
    case 'FETCH_SINGLE_PRODUCT_FAILURE':
    case 'CREATE_PRODUCT_FAILURE':
    case 'EDIT_PRODUCT_FAILURE':
    case 'UPLOAD_PRODUCT_IMAGE_FAILURE':
    default:
      return state
  }
}
