import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import nav from './nav'
import card from './card'
import bank from './bank'
import bitcoin from './bitcoin'
import chat from './chat'
import offers from './offers'
import orders from './orders'
import profile from './profile'
import shops from './shops'
import products from './products'

export default combineReducers({
  user,
  nav,
  card,
  bank,
  bitcoin,
  chat,
  offers,
  orders,
  profile,
  shops,
  products,
  form: formReducer,
  router: routerReducer
})
