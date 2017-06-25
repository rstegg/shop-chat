const router = require('express').Router()
const passport = require('passport')
const { allPass, pipe, path } = require('ramda')

const editProfileHandler = require('./handlers/profile/editprofile')
const getProfileHandler = require('./handlers/profile/getprofile')

const validateBody = require('../middleware/validate-body')
const validField = require('../middleware/valid-field')

const validProfile = pipe(
  path(['profile']),
  allPass([
      validField('name'),
      validField('username')
  ])
)

module.exports =
  router
    .get(`/:username`,
      getProfileHandler
    )
    .put(`/`,
      passport.authenticate('jwt', { session: false }),
      validateBody(validProfile),
      editProfileHandler
    )
