const router = require('express').Router()
const passport = require('passport')

const createProductHandler = require('../handlers/products/createproduct')
const editProductHandler = require('../handlers/products/editproduct')
const editProductLayoutHandler = require('../handlers/products/editproductlayout')
const editProductThemeHandler = require('../handlers/products/editproducttheme')
const shareProductHandler = require('../handlers/products/shareproduct')
const getProductsHandler = require('../handlers/products/getproducts')
const getProductHandler = require('../handlers/products/getproduct')
const deleteProductGalleryHandler = require('../handlers/products/deleteproductgallery')
const deleteProductHandler = require('../handlers/products/deleteproduct')

module.exports =
  router
    .get(`/:shopId/:id`,
      getProductHandler
    )
    .use(passport.authenticate('jwt', { session: false }))
    .get(`/:shopId`,
      getProductsHandler
    )
    .post(`/:shopId`,
      createProductHandler
    )
    .put(`/:shopId/:id`,
      editProductHandler
    )
    .put(`/:shopId/:id/layout`,
      editProductLayoutHandler
    )
    .put(`/:shopId/:id/theme`,
      editProductThemeHandler
    )
    .post(`/share`,
      shareProductHandler
    )
    .delete(`/:shopId/:id/gallery/:index`,
      deleteProductGalleryHandler
    )
    .delete(`/:shopId/:id`,
      deleteProductHandler
    )
