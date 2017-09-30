const router = require('express').Router()
const passport = apiRequire('service/auth')
const { allPass, path, pipe, prop, is } = require('ramda')

const createProductHandler = require('./handlers/create')
const editProductHandler = require('./handlers/edit')
const editProductLayoutHandler = require('./handlers/editLayout')
const editProductThemeHandler = require('./handlers/editTheme')
const shareProductHandler = require('./handlers/share')
const getProductsHandler = require('./handlers/getAll')
const getProductHandler = require('./handlers/get')
const deleteProductGalleryHandler = require('./handlers/deleteGallery')
const deleteProductHandler = require('./handlers/delete')

const validateBody = apiRequire('middleware/validate-body')
const validateParams = apiRequire('middleware/validate-params')
const validField = apiRequire('middleware/valid-field')
const validFields = apiRequire('middleware/valid-fields')

const validProduct = validFields('product', [ 'name', 'isPublic', 'price' ])
const validEditProductParams = validFields(false, [ 'id'])
const validShareProduct = validFields(false, [ 'email', 'name', 'url' ])

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

const validTheme = validFields(false, ['theme', 'color'])
  allPass([
    validField('theme'),
    validField('color'),
    validRGBField(['color', 'rgb']),
  ])

module.exports =
  router
    .get('/:id',
      getProductHandler
    )
    .use(passport.authenticate('jwt', { session: false }))
    .post('/',
      validateBody(validProduct),
      createProductHandler
    )
    .put('/:id',
      validateBody(validProduct),
      validateParams(validEditProductParams),
      editProductHandler
    )
    .put('/:id/layout',
      validateBody(validLayout, 'invalid layout'),
      validateParams(validEditProductParams),
      editProductLayoutHandler
    )
    .put('/:id/theme',
      validateBody(validTheme, 'invalid theme'),
      validateParams(validEditProductParams),
      editProductThemeHandler
    )
    .post('/share',
      validateBody(validShareProduct),
      shareProductHandler
    )
    .delete('/:id/gallery/:index',
      deleteProductGalleryHandler
    )
    .delete('/:id',
      deleteProductHandler
    )
