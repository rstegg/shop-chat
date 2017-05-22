const { models } = require('../../../db')
const { Product, Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const updateProductParams = ['name', 'is_public', 'description', 'category', 'sub_category', 'price_type', 'price', 'image']
const productParams = ['id', 'name', 'slug', 'is_public', 'description', 'category', 'sub_category', 'price_type', 'price', 'image', 'shopId']

const validBody = pipe(
  path(['body', 'product']),
  allPass([
      validField('name'),
      validField('is_public'),
      validField('price_type')
  ]))

const getValidSlug = (slug, shopId, productId) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, shopId, id: { $ne: productId } }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), shopId, productId)
        : resolve(slug)
    )
  )

const getValidParams = (productId, shopId, userId, slug) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : getValidSlug(slug, shopId, productId)
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const { shopId, id } = req.params

  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(id, shopId, req.user.id, slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const updatedProduct = merge({
        slug
      }, pick(updateProductParams, req.body.product))
      return Product.update(updatedProduct, { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({product})
    })
    .catch(error => res.status(400).json({error}))
}
