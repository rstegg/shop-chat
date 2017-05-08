const router = require('express').Router()
const passport = require('passport')

const createShopHandler = require('../handlers/shops/createshop')
const editShopHandler = require('../handlers/shops/editshop')
const shareShopHandler = require('../handlers/shops/shareshop')
const getShopsHandler = require('../handlers/shops/getshops')
const getShopHandler = require('../handlers/shops/getshop')
const deleteShopHandler = require('../handlers/shops/deleteshop')

module.exports = () => {

  router.get(`/shop/:id`,
    getShopHandler
  )
  .use(passport.authenticate('jwt', { session: false })),
    .get(`/shops`,
    getShopsHandler
  )
  .post(`/shops`,
    createShopHandler
  )
  .put(`/shop/:id`,
    editShopHandler
  )
  .post(`/share/shop`,
    shareShopHandler
  )
  .delete(`/shop/:id`,
    deleteShopHandler
  )

  return router
}
