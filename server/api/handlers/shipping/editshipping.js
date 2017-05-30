const { models } = require('../../../db')
const { Shipping } = models

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')

const { confirmationMail, sendConfirmation } = require('../../service/mail')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const shippingAttributes = ['id', 'name', 'line1', 'line2', 'city', 'region', 'country', 'zip']

const validField = p => obj => !isNil(path([p], obj))

const validAccountFields = pipe(
    path(['body', 'shipping']),
    allPass([
        validField('name'),
        validField('line1'),
        validField('city'),
        validField('region'),
        validField('country'),
        validField('zip'),
    ]))

const getUserId = path(['user', 'id'])
const getUserName = path(['user', 'name'])

const validate = req => {
  if (!validAccountFields(req)) return Promise.reject('missing fields')

  return Shipping.findOrCreate({
      where: { userId: getUserId(req) },
      defaults: { name: getUserName(req) }
  })
  .spread(shipping => shipping.get({plain: true}))
}

module.exports = (req, res) =>
  validate(req)
    .then(validShipping => {
      const updatedShipping = merge({
        name: validShipping.name,
        line1: validShipping.line1,
        line2: validShipping.line2,
        city: validShipping.city,
        region: validShipping.region,
        country: validShipping.country,
        zip: validShipping.zip,
      }, pick(['name', 'line1', 'line2', 'city', 'region', 'country', 'zip'], req.body.shipping))
      return Shipping.update(updatedShipping, { where: { id: validShipping.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(updatedShipping => {
      const updatedAddress = updatedShipping[1]
      const shipping = pick(shippingAttributes, updatedAddress)
      res.status(200).json({shipping})
    })
    .catch(error => res.status(400).json({error}))
