const router = require('express').Router()
const passport = require('passport')
const { prop } = require('ramda')

const loginHandler = require('../handlers/auth/loginHandler')
const signupHandler = require('../handlers/auth/signupHandler')
const validateEmailHandler = require('../handlers/auth/validateEmailHandler')
const validateUsernameHandler = require('../handlers/auth/validateUsernameHandler')
const verifyTokenHandler = require('../handlers/auth/verifyTokenHandler')

const validateBody = require('../middleware/validate-body')

module.exports =
  router
    .post(`/login`,
      passport.authenticate('local', { session: false }),
      loginHandler
    )
    .post(`/signup`,
      signupHandler
    )
   .post(`/signup/validate_email`,
      validateBody(prop('email'), 'missing email'),
      validateEmailHandler
    )
    .post(`/signup/validate_username`,
      validateBody(prop('username'), 'missing username'),
      validateUsernameHandler
    )
    .get(`/signup/email_confirmation/:permalink/:verify_token`,
      verifyTokenHandler
    )
