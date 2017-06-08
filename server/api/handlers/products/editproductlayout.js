const { models } = require('../../../db')
const { Product, Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const updateProductParams = ['name', 'is_public', 'description', 'category', 'sub_category', 'price', 'image']
const productParams = ['id', 'name', 'slug', 'is_public', 'description', 'category', 'sub_category', 'price', 'image', 'shopId']

const validBody = pipe(
  path(['body']),
  allPass([
      validField('layout')
  ]))

const validParams = pipe(
  path(['params']),
  allPass([
      validField('id'),
      validField('shopId')
  ]))

const getValidParams = (productId, shopId, userId) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : shop
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const { shopId, id } = req.params

  return getValidParams(id, shopId, req.user.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(shop => {
      const updatedProduct = {
        layout: req.body.layout
      }
      return Product.update(updatedProduct, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({product})
    })
    .catch(error => res.status(400).json({error}))
}
