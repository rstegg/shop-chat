const initialState = {
  current: {
    isAdmin: false,
    isCropperOpen: false,
    imagePreview: null,
  },
  new: {
    name: '',
    image_error: false,
    is_public: false
  },
  list: [],
  fetchable: true,
  isFetching: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_CREATE_PRODUCT_CROPPER':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          isCropperOpen: true,
          imagePreview: action.payload.image
        }
      })
    case 'CLOSE_CREATE_PRODUCT_CROPPER':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          isCropperOpen: false,
          imagePreview: null
        }
      })
    case 'OPEN_CHANGE_PRODUCT_LAYOUT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'layout'
        }
      })
    case 'OPEN_ADD_PRODUCT_OPTIONS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'options'
        }
      })
    case 'OPEN_ADD_PRODUCT_TEXT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'text'
        }
      })
    case 'OPEN_ADD_PRODUCT_MEDIA':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'text'
        }
      })
    case 'CLOSE_CHANGE_PRODUCT_LAYOUT':
    case 'CLOSE_ADD_PRODUCT_TEXT':
    case 'CLOSE_ADD_PRODUCT_OPTIONS':
    case 'CLOSE_ADD_PRODUCT_MEDIA':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: null
        }
      })
    case 'OPEN_EDIT_PRODUCT_CROPPER':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isCropperOpen: true,
          imagePreview: action.payload.image
        }
      })
    case 'CLOSE_EDIT_PRODUCT_CROPPER':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isCropperOpen: false,
          imagePreview: null
        }
      })
    case 'SWITCH_TO_PRODUCT_ADMIN':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isAdmin: true
        }
      })
    case 'SWITCH_TO_PRODUCT_USER':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isAdmin: false
        }
      })
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
          ...action.payload.product,
          isEdited: true
        }
      })
    case 'DELETE_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_PRODUCT_IMAGE':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: null,
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_PRODUCT_IMAGE_FAILURE':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: null,
          image_loading: false,
          image_error: true
        }
      })
    case 'UPLOAD_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE_FAILURE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: false,
          image_error: true
        }
      })
    case 'FETCH_SINGLE_PRODUCT':
      return Object.assign({}, state, {
        isFetching: action.payload.productId
      })
    case 'FETCH_SINGLE_PRODUCT_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.product,
        isFetching: null
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
    default:
      return state
  }
}
