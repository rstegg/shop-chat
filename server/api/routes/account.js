const router = require('express').Router()
const passport = require('passport')
const { allPass, pipe, path } = require('ramda')

const editAccountHandler = require('./handlers/account/editaccount')
const getAccountHandler = require('./handlers/account/getaccount')

const validateBody = require('../middleware/validate-body')
const validField = require('../middleware/valid-field')

const validAccountUser = pipe(
  path(['account']),
  allPass([
      validField('name'),
      validField('email'),
      validField('username'),
      validField('old_password')
  ])
)

module.exports =
  router
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/`,
      getAccountHandler
    )
    .put(`/`,
      validateBody(validAccountUser),
      editAccountHandler
    )
