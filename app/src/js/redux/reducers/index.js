import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import card from './card'
import bank from './bank'
import bitcoin from './bitcoin'
import chat from './chat'
import offers from './offers'
import orders from './orders'
import profile from './profile'
import products from './products'

export default combineReducers({
  user,
  card,
  bank,
  bitcoin,
  chat,
  offers,
  orders,
  profile,
  products,
  form: formReducer,
  router: routerReducer
})
