const { models } = require('../../../db')
const { Offer, Offer } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const offerParams = ['price', 'price_type', 'state']

const validBody = pipe(
  path(['body', 'offer']),
  allPass([
      validField('price'),
      validField('state')
  ]))

const getValidProduct = (id, userId) =>
  Product.findOne({
    where: { id, userId }
  })
  .then(product =>
    !product ? Promise.reject('Invalid permission')
    : product
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  return getValidProduct(req.body.productId, req.user.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(product => {
      const newOffer = merge({
        productId: product.id,
        userId: req.user.id
      }, pick(offerParams, req.body.offer))
      return Offer.create(newOffer, { plain: true })
    })
    .then(offer => res.status(200).json({offer}))
    .catch(error => res.status(400).json({error}))
}
