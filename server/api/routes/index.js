const login = require('./login')
const signup = require('./signup')
const braintree = require('./braintree')
const stripe = require('./stripe')
const shops = require('./shops')
const products = require('./products')
const account = require('./account')
const address = require('./address')
const profile = require('./profile')
const images = require('./images')

module.exports = [
  login,
  signup,
  braintree,
  stripe,
  shops,
  products,
  account,
  address,
  profile,
  images,
]
