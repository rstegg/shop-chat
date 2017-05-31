const router = require('express').Router()
const passport = require('passport')

const addStripeCardHandler = require('../handlers/stripe/addstripecard')
const getStripeCardsHandler = require('../handlers/stripe/getstripecards')

module.exports = () => {
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/stripe/cards`,
      getStripeCardsHandler
    )
    .post('/stripe/cards',
      addStripeCardHandler
    )
  return router
}
