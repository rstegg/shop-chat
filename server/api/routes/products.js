const router = require('express').Router()
const passport = require('passport')
const { allPass, path, pipe, prop, is } = require('ramda')

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

const validLayoutField = layout => ['grid', 'image', 'gallery'].includes(layout)
const validRGBField = p => obj => is(Object, path(p, obj))

const validLayout =
  allPass([
    validField('layout'),
    pipe(
      prop('layout'),
      validLayoutField
    )
  ])

const validTheme =
  allPass([
    validField('theme'),
    validField('color'),
    validRGBField(['color', 'rgb']),
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
      validateBody(validLayout, 'invalid layout'),
      validateParams(validEditProductParams),
      editProductLayoutHandler
    )
    .put(`/:shopId/:id/theme`,
      validateBody(validTheme, 'invalid theme'),
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
