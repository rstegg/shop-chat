const router = require('express').Router()
const passport = require('passport')

const createProductHandler = require('../handlers/products/createproduct')
const editProductHandler = require('../handlers/products/editproduct')
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
  .post(`/products`,
    createProductHandler
  )
  .put(`/product/:id`,
    editProductHandler
  )
  .post(`/share/product`,
    shareProductHandler
  )
  .delete(`/product/:id`,
    deleteProductHandler
  )

  return router
}
