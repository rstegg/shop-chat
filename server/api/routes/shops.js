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

  router.get(`/shops`,
    passport.authenticate('jwt', { session: false }),
    getShopsHandler
  )

  router.post(`/shops`,
    passport.authenticate('jwt', { session: false }),
    createShopHandler
  )

  router.put(`/shop/:id`,
    passport.authenticate('jwt', { session: false }),
    editShopHandler
  )

  router.post(`/share/shop`,
    passport.authenticate('jwt', { session: false }),
    shareShopHandler
  )

  router.delete(`/shop/:id`,
    passport.authenticate('jwt', { session: false }),
    deleteShopHandler
  )

  return router
}
