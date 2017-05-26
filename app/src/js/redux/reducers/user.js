const initialState = {
  id: null,
  token: '',
  isAuthenticated: false,
  isRegistered: false,
  isAccountSaved: false,
  image: '',
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_SUBMIT':
    case 'SIGNUP_SUBMIT':
      return Object.assign({}, state, {
        error: null,
        isLoading: true
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.user,
        isAuthenticated: true,
        token: 'JWT ' + action.payload.token,
        error: null,
        isLoading: false
      })
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.user,
        isAuthenticated: true,
        token: 'JWT ' + action.payload.token,
        isRegistered: true,
        error: null,
        isLoading: false
      })
    case 'EDIT_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        ...state,
        ...action.payload.user,
        error: null,
        isLoading: false,
      })
    case 'SAVE_ACCOUNT_SETTINGS_SUCCESS':
      return Object.assign({}, state, {
        ...state,
        ...action.payload.account,
        error: null,
        isLoading: false,
        isAccountSaved: true
      })
    case 'SAVE_ACCOUNT_SETTINGS_FAILURE':
      return Object.assign({}, state, {
        ...state,
        error: action.payload.error
      })
    case 'UPLOAD_PROFILE_IMAGE':
      return Object.assign({}, state, {
        image: null,
        image_loading: true,
        image_error: false
      })
    case 'UPLOAD_PROFILE_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image,
        image_loading: false,
        image_error: false
      })
    case 'UPLOAD_PROFILE_IMAGE_FAILURE':
      return Object.assign({}, state, {
        image: null,
        image_loading: false,
        image_error: true
      })
    case 'RESET_LOGIN':
    case 'RESET_SIGNUP':
      return Object.assign({}, state, {
        isRegistered: false,
        isLoading: false,
        error: null,
      })
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      const error = action.payload.error === 'Unauthorized' ? 'Wrong username or password' : action.payload.error
      return Object.assign({}, state, {
        error,
        isLoading: false
      })
    case 'LOGOUT':
      return initialState
    case 'UPLOAD_PROFILE_IMAGE_FAILURE':
    case 'EDIT_PROFILE_FAILURE':
    default:
      return state
  }
}
