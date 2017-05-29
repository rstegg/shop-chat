const { models } = require('../../../db')
const { Shipping } = models

const shippingAttributes = ['id', 'name', 'line1', 'line2', 'city', 'region', 'country', 'zip']

const validate = req =>
  Shipping.findOrCreate({
    where: { userId: req.user.id },
    defaults: { name: req.user.name },
    attributes: shippingAttributes
  })
  .then(shipping =>
      !shipping ?
          Promise.reject('invalid shipping')
          : shipping.get({plain: true})
  )

module.exports = (req, res) =>
  validate(req)
    .then(shipping => res.status(200).json({shipping}))
    .catch(error => res.status(400).json({error}))
