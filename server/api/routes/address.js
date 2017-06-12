const router = require('express').Router()
const passport = require('passport')

const editAddressHandler = require('../handlers/address/editaddress')
const getAddressHandler = require('../handlers/address/getaddress')

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/`,
      getAddressHandler
    )
    .put(`/`,
      editAddressHandler
    )
