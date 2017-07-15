const initialState = {
  current: {
    isAdmin: false,
    isCropperOpen: false,
    imagePreview: null,
  },
  new: {
    name: '',
    imageError: false,
    isPublic: false
  },
  list: [],
  isFetching: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'OPEN_CREATE_SHOP_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: true,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_CREATE_SHOP_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: false,
        imagePreview: null
      }
    })
  case 'OPEN_EDIT_SHOP_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isCropperOpen: true,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_EDIT_SHOP_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isCropperOpen: false,
        imagePreview: null
      }
    })
  case 'SWITCH_TO_SHOP_ADMIN':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isAdmin: true
      }
    })
  case 'SWITCH_TO_SHOP_USER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isAdmin: false
      }
    })
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
        imageLoading: true,
        imageError: false
      }
    })
  case 'UPLOAD_SHOP_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        image: action.payload.image,
        imageLoading: false,
        imageError: false
      }
    })
  case 'UPLOAD_SHOP_IMAGE_FAILURE':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        image: null,
        imageLoading: false,
        imageError: true
      }
    })
  case 'UPLOAD_EDIT_SHOP_IMAGE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: null,
        imageLoading: true,
        imageError: false
      }
    })
  case 'UPLOAD_EDIT_SHOP_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: action.payload.image,
        imageLoading: false,
        imageError: false
      }
    })
  case 'UPLOAD_EDIT_SHOP_IMAGE_FAILURE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: null,
        imageLoading: false,
        imageError: true
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
