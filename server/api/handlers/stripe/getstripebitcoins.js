const { models } = require('../../../db')
const { User } = models
const { merge, pick } = require('ramda')

const userAttributes = ['id', 'bitcoin_addresses']

const validate = req =>
  User.findOne({
    where: { id: req.user.id },
    attributes: userAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid user')
          : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(({bitcoin_addresses}) => res.status(200).json({bitcoin_addresses}))
    .catch(error => res.status(400).json({error}))
