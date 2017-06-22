const router = require('express').Router()
const passport = require('passport')
const { allPass, path, pipe, prop } = require('ramda')

const createProductHandler = require('../handlers/products/createproduct')
const editProductHandler = require('../handlers/products/editproduct')
const editProductLayoutHandler = require('../handlers/products/editproductlayout')
const editProductThemeHandler = require('../handlers/products/editproducttheme')
const shareProductHandler = require('../handlers/products/shareproduct')
const getProductsHandler = require('../handlers/products/getproducts')
const getProductHandler = require('../handlers/products/getproduct')
const deleteProductGalleryHandler = require('../handlers/products/deleteproductgallery')
const deleteProductHandler = require('../handlers/products/deleteproduct')

const validateBody = require('../middleware/validate-body')
const validateParams = require('../middleware/validate-params')
const validField = require('../middleware/valid-field')

const validProduct = pipe(
  path(['product']),
  allPass([
    validField('name'),
    validField('is_public'),
    validField('price'),
  ])
)

const validCreateProductParams =
  allPass([
      validField('shopId')
  ])

const validEditProductParams =
  allPass([
      validField('shopId'),
      validField('id'),
  ])

const validShareProduct =
  allPass([
    validField('email'),
    validField('name'),
    validField('url'),
    validField('productId')
  ])

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
      validateBody(validProduct),
      validateParams(validCreateProductParams),
      createProductHandler
    )
    .put(`/:shopId/:id`,
      validateBody(validProduct),
      validateParams(validEditProductParams),
      editProductHandler
    )
    .put(`/:shopId/:id/layout`,
      validateBody(prop('layout'), 'missing layout'),
      validateParams(validEditProductParams),
      editProductLayoutHandler
    )
    .put(`/:shopId/:id/theme`,
      validateBody(prop('theme'), 'missing theme'),
      validateParams(validEditProductParams),
      editProductThemeHandler
    )
    .post(`/share`,
      validateBody(validShareProduct),
      shareProductHandler
    )
    .delete(`/:shopId/:id/gallery/:index`,
      deleteProductGalleryHandler
    )
    .delete(`/:shopId/:id`,
      deleteProductHandler
    )
