const initialState = {
  current: {},
  new: {
    name: '',
    image_error: false,
    is_public: false
  },
  list: [],
  isFetching: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_SINGLE_SHOP':
      return Object.assign({}, state, {
        isFetching: action.payload.shopId
      })
    case 'FETCH_SINGLE_SHOP_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.shop,
        isFetching: null
      })
    case 'FETCH_SHOPS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.shops
      })
    case 'CREATE_SHOP_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...initialState.new,
          isCreated: true
        }
      })
    case 'EDIT_SHOP_FIELD':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          focused: action.payload.field
        }
      })
    case 'EDIT_SHOP':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          focused: null
        }
      })
    case 'EDIT_SHOP_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          ...action.payload.shop
        }
      })
    case 'DELETE_SHOP_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_SHOP_IMAGE':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: null,
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_SHOP_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_SHOP_IMAGE_FAILURE':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: null,
          image_loading: false,
          image_error: true
        }
      })
    case 'UPLOAD_EDIT_SHOP_IMAGE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_SHOP_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_SHOP_IMAGE_FAILURE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: false,
          image_error: true
        }
      })
    case 'SET_CURRENT_SHOP':
      return Object.assign({}, state, {
        current: action.payload.shop
      })
    case 'REFRESH_SHOPS':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_SHOPS_FAILURE':
    case 'CREATE_SHOP_FAILURE':
    default:
      return state
  }
}
