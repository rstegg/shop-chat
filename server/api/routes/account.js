const router = require('express').Router()
const passport = require('passport')

const editAccountHandler = require('../handlers/account/editaccount')
const getAccountHandler = require('../handlers/account/getaccount')

module.exports = () => {
  router.get(`/account`,
    getAccountHandler
  )
  .put(`/account`,
    passport.authenticate('jwt', { session: false }),
    editAccountHandler
  )

  return router
}
