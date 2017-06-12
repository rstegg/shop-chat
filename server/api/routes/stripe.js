const router = require('express').Router()
const passport = require('passport')

const addStripeCardHandler = require('../handlers/stripe/addstripecard')
const getStripeCardsHandler = require('../handlers/stripe/getstripecards')
const addStripeBankHandler = require('../handlers/stripe/addstripebank')
const getStripeBanksHandler = require('../handlers/stripe/getstripebanks')
const addStripeBitcoinHandler = require('../handlers/stripe/addstripebitcoin')
const getStripeBitcoinsHandler = require('../handlers/stripe/getstripebitcoins')

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/cards`,
      getStripeCardsHandler
    )
    .post('/cards',
      addStripeCardHandler
    )
    .get(`/banks`,
      getStripeBanksHandler
    )
    .post('/banks',
      addStripeBankHandler
    )
    .get(`/bitcoins`,
      getStripeBitcoinsHandler
    )
    .post('/bitcoins',
      addStripeBitcoinHandler
    )
