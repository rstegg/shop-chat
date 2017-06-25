const router = require('express').Router()
const passport = require('passport')
const { allPass, pipe, path } = require('ramda')

const createShopHandler = require('./handlers/shops/createshop')
const editShopHandler = require('./handlers/shops/editshop')
const shareShopHandler = require('./handlers/shops/shareshop')
const getShopsHandler = require('./handlers/shops/getshops')
const getShopHandler = require('./handlers/shops/getshop')
const deleteShopHandler = require('./handlers/shops/deleteshop')

const validateBody = require('../middleware/validate-body')
const validField = require('../middleware/valid-field')

const validShop = pipe(
  path(['shop']),
  allPass([
      validField('name'),
      validField('is_public')
  ])
)

const validShareShop = allPass([
  validField('email'),
  validField('name'),
  validField('url'),
  validField('shopId')
])

module.exports =
  router
    .get(`/:id`,
      getShopHandler
    )
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/`,
      getShopsHandler
    )
    .post(`/`,
      validateBody(validShop),
      createShopHandler
    )
    .put(`/:id`,
      validateBody(validShop),
      editShopHandler
    )
    .post(`/share`,
      validateBody(validShareShop),
      shareShopHandler
    )
    .delete(`/:id`,
      deleteShopHandler
    )
