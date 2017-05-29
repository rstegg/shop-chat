const router = require('express').Router()
const passport = require('passport')

const editAccountHandler = require('../handlers/account/editaccount')
const getAccountHandler = require('../handlers/account/getaccount')

module.exports = () => {
  router.use(passport.authenticate('jwt', { session: false }))
  .get(`/account`,
    getAccountHandler
  )
  .put(`/account`,
    editAccountHandler
  )

  return router
}
