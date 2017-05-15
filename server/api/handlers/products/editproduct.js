const { models } = require('../../../db')
const { Product } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const productParams = ['id', 'name', 'slug', 'is_public', 'description', 'category', 'sub_category', 'price_type', 'price', 'image', 'shopId']

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
  path(['body', 'product']),
  allPass([
      validField('name'),
      validField('shopId')
  ]))

const getValidPermission = (id, userId) =>
  Shop.findOne({
    where: { id, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : shop
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  return getValidPermission(req.body.product.shopId, req.user.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(shop => {
      const updatedProduct = merge({
        shopId: shop.id
      }, pick(productParams, req.body.product))
      return Product.update(updatedProduct, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({product})
    })
    .catch(error => res.status(400).json({error}))
}
