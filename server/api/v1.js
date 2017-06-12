'use strict'
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const routes = require('./routes')

const configureAuth = require('./service/auth')

module.exports = () => {
  //TODO: move configureAuth to local routes
  configureAuth()
  
  router.use('/', routes)
  return router
}
