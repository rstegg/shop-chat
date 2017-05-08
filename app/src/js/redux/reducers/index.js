import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import products from './products'
import shops from './shops'
import profile from './profile'

export default combineReducers({
  user,
  products,
  shops,
  profile,
  form: formReducer,
  router: routerReducer
})
