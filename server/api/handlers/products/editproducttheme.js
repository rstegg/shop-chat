const { models } = require('../../../db')
const { Product, Shop } = models

const shortId = require('shortid')

const { allPass, assoc, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const productParams = ['id', 'name', 'slug', 'is_public', 'description', 'gallery', 'layout', 'themes', 'category', 'sub_category', 'price', 'image', 'shopId']

const validBody = pipe(
  path(['body']),
  allPass([
      validField('theme'),
      validField('color')
  ]))

const validParams = pipe(
  path(['params']),
  allPass([
      validField('id'),
      validField('shopId')
  ]))

const getValidParams = (productId, userId) =>
  Product.findOne({
    where: { id: productId, userId }
  })
  .then(product =>
    !product ? Promise.reject('Invalid permission')
    : product
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')
  if (!validParams(req)) return Promise.reject('missing fields')

  const { shopId, id } = req.params

  return getValidParams(id, req.user.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(product => {
      const updateTheme = assoc(req.body.theme, req.body.color)
      const updatedProduct = {
        themes: updateTheme(product.themes)
      }
      return Product.update(updatedProduct, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({product})
    })
    .catch(error => res.status(400).json({error}))
}
