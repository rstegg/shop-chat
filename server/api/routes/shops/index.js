const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, pipe, path } = require('ramda')

const createShopHandler = require('./handlers/create')
const editShopHandler = require('./handlers/edit')
const shareShopHandler = require('./handlers/share')
const getShopsHandler = require('./handlers/getAll')
const getShopHandler = require('./handlers/get')
const deleteShopHandler = require('./handlers/delete')

const validateBody = apiRequire('middleware/validate-body')
const validFields = apiRequire('middleware/valid-field')

const validShop = validFields('shop', ['name', 'isPublic'])
const validShareShop = validFields(false, ['email', 'name', 'url', 'shopId'])

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
