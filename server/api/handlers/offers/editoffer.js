const { models } = require('../../../db')
const { Offer, Product } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const offerParams = ['price', 'price_type', 'state']

const validBody = pipe(
  path(['body', 'product']),
  allPass([
      validField('name'),
      validField('is_public')
  ]))

const getValidParams = (productId, productId, userId, slug) =>
  Product.findOne({
    where: { id: productId, userId }
  })
  .then(product =>
    !product ? Promise.reject('Invalid permission')
    : product
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const { productId, id } = req.params

  return getValidParams(id, productId, req.user.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(product => {
      const updatedOffer = pick(productParams, req.body.product))
      return Offer.update(updatedOffer, { where: { id: req.body.offerId, productId: product.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedOffer => {
      const offer = pick(offerParams, savedOffer[1])
      res.status(200).json({offer})
    })
    .catch(error => res.status(400).json({error}))
}
