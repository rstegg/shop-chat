const router = require('express').Router()
const passport = require('passport')
const { allPass, pipe, path } = require('ramda')

const editAddressHandler = require('../handlers/address/editaddress')
const getAddressHandler = require('../handlers/address/getaddress')

const validateBody = require('../middleware/validate-body')
const validField = require('../middleware/valid-field')

const validAddress = pipe(
  path(['address']),
  allPass([
      validField('name'),
      validField('line1'),
      validField('city'),
      validField('region'),
      validField('country'),
      validField('zip')
  ])
)

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/`,
      getAddressHandler
    )
    .put(`/`,
      validateBody(validAddress),
      editAddressHandler
    )
