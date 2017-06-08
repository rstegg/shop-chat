const router = require('express').Router()
const passport = require('passport')

const createProductHandler = require('../handlers/products/createproduct')
const editProductHandler = require('../handlers/products/editproduct')
const editProductLayoutHandler = require('../handlers/products/editproductlayout')
const shareProductHandler = require('../handlers/products/shareproduct')
const getProductsHandler = require('../handlers/products/getproducts')
const getProductHandler = require('../handlers/products/getproduct')
const deleteProductHandler = require('../handlers/products/deleteproduct')

module.exports = () => {

  router.get(`/shop/:shopId/product/:id`,
    getProductHandler
  )
  .use(passport.authenticate('jwt', { session: false }))
  .get(`/shop/:shopId/products`,
    getProductsHandler
  )
  .post(`/shop/:shopId/products`,
    createProductHandler
  )
  .put(`/shop/:shopId/product/:id`,
    editProductHandler
  )
  .put(`/shop/:shopId/product/:id/layout`,
    editProductLayoutHandler
  )
  .post(`/share/product`,
    shareProductHandler
  )
  .delete(`/shop/:shopId/product/:id`,
    deleteProductHandler
  )

  return router
}
