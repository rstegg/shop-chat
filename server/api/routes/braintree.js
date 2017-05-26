const router = require('express').Router()
const passport = require('passport')

const editAccountHandler = require('../handlers/account/editaccount')
const getAccountHandler = require('../handlers/account/getaccount')

const braintree = require('braintree')

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
})

module.exports = () => {
  router.get('/bt_client_token', (req, res) =>
    gateway.clientToken.generate({}, (err, response) =>
      res.json({bt_client_token: response.clientToken})
    )
  )

  return router
}
