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
    case 'FETCH_SINGLE_SHOP':
      return Object.assign({}, state, {
        list: action.payload.shops,
        fetchable: false
      })
    case 'FETCH_SINGLE_SHOP_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.shop,
        fetchable: true
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
          ...action.payload.shop,
          focused: null
        }
      })
    case 'EDIT_SHOP_SUCCESS':
      return state //FIXME: PLACEHOLDER
    case 'DELETE_SHOP_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_SHOP_IMAGE_SUCCESS':
    case 'UPLOAD_EDIT_SHOP_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image,
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
    case 'CREATE_STRIPE_CARD_FAILURE':
    case 'CREATE_SHOP_FAILURE':
    default:
      return state
  }
}
