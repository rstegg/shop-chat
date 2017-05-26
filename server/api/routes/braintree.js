const router = require('express').Router()
const passport = require('passport')

const addBraintreeCardHandler = require('../handlers/braintree/addbraintreecard')
const getBraintreeTokenHandler = require('../handlers/braintree/getbraintreetoken')

module.exports = () => {
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get('/bt_client_token',
      getBraintreeTokenHandler
    )
    .post('/braintree/cards',
      addBraintreeCardHandler
    )
  return router
}
