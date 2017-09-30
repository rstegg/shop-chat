import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import stripeEpics from './stripe'
import productEpics from './products'
import profileEpics from './profile'
import { saveAccountSettings } from './account'
import { saveAddressSettings } from './address'

export default combineEpics(
  loginSubmit,
  signupSubmit,
  productEpics,
  stripeEpics,
  saveAccountSettings,
  saveAddressSettings,
  profileEpics
)
