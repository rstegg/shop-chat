const router = require('express').Router()
const passport = require('passport')

const addStripeCardHandler = require('../handlers/stripe/addstripecard')
const getStripeCardsHandler = require('../handlers/stripe/getstripecards')
const addStripeBitcoinHandler = require('../handlers/stripe/addstripebitcoin')
const getStripeBitcoinsHandler = require('../handlers/stripe/getstripebitcoins')

module.exports = () => {
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/stripe/cards`,
      getStripeCardsHandler
    )
    .post('/stripe/cards',
      addStripeCardHandler
    )
    .get(`/stripe/bitcoin`,
      getStripeBitcoinsHandler
    )
    .post('/stripe/bitcoin',
      addStripeBitcoinHandler
    )
  return router
}
