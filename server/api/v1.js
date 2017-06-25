'use strict'
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const routes = require('./routes')

const passport = require('./service/auth')

module.exports =
  router.use('/', routes)
