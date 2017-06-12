const router = require('express').Router()

const auth = require('./auth')
const stripe = require('./stripe')
const shops = require('./shops')
const products = require('./products')
const account = require('./account')
const address = require('./address')
const profile = require('./profile')
const images = require('./images')

module.exports =
  router
    .use('/auth', auth)
    .use('/stripe', stripe)
    .use('/shops', shops)
    .use('/products', products)
    .use('/account', account)
    .use('/address', address)
    .use('/profile', profile)
    .use('/image', images)
