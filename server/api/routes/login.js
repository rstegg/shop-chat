const router = require('express').Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const login = require('../handlers/login/login');

module.exports = () => {
  router.post(`/login`,
    passport.authenticate('local', { session: false }),
    login
  )

  return router
}
