const router = require('express').Router()

const { prop } = require('ramda');

const validateBody = require('../middleware/validate-body')

const signupHandler = require('../handlers/signup/signup')
const verifyTokenHandler = require('../handlers/signup/verifytoken')
const validateEmailHandler = require('../handlers/signup/validateemail')
const validateUsernameHandler = require('../handlers/signup/validateusername')

module.exports = () => {
  router.post(`/signup`,
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

  return router
}
