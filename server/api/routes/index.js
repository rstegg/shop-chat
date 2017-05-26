const login = require('./login')
const signup = require('./signup')
const braintree = require('./braintree')
const shops = require('./shops')
const products = require('./products')
const account = require('./account')
const profile = require('./profile')
const images = require('./images')

module.exports = [
  login,
  signup,
  braintree,
  shops,
  products,
  account,
  profile,
  images,
]
