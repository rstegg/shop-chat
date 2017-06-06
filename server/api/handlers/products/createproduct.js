const { models } = require('../../../db')
const { Product, Shop, Thread } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const productParams = ['name', 'is_public', 'description', 'category', 'tags', 'price', 'image']

const validBody = pipe(
  path(['body', 'product']),
  allPass([
      validField('name'),
      validField('is_public'),
      validField('price'),
  ]))

const validParams = pipe(
  path(['params']),
  allPass([
      validField('shopId')
  ]))

const getValidSlug = (slug, shopId, thread) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, shopId }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), shopId)
        : resolve({slug, thread})
    )
  )

const createThread = (shopId, username, slug) =>
  Thread.create({ title: slug, owner: username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : getValidSlug(slug, shopId, thread)
    )

const getValidParams = (shopId, userId, slug) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : createThread(shopId, userId, slug)
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')
  if (!validParams(req)) return Promise.reject('bad params')

  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(req.params.shopId, req.user.id, slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(({slug, thread}) => {
      const newProduct = merge({
        slug,
        shopId: req.params.shopId,
        threadId: thread.id,
        userId: req.user.id
      }, pick(productParams, req.body.product))
      return Product.create(newProduct, { plain: true })
    })
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
}
