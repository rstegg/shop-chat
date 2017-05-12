import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import chat from './chat'
import profile from './profile'
import shops from './shops'
import products from './products'

export default combineReducers({
  user,
  chat,
  profile,
  shops,
  products,
  form: formReducer,
  router: routerReducer
})
