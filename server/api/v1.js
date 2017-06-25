'use strict'
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const routes = require('./routes')

const configureAuth = require('./service/auth')

configureAuth()

module.exports =
  router.use('/', routes)
