const { models } = require('../../../db')
const { Product, Shop } = models

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

const getValidSlug = (slug, shopId) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, shopId }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`))
        : resolve(slug)
    )
  )

const getValidParams = (id, userId, slug) =>
  Shop.findOne({
    where: { id, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : getValidSlug(slug, id)
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(req.body.product.shopId, req.user.id, slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const newProduct = merge({
        slug
      }, pick(productParams, req.body.product))
      return Product.create(newProduct, { plain: true })
    })
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
}
