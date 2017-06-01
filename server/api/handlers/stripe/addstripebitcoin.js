const { models } = require('../../../db')
const { User } = models
const stripe = require('../../service/stripe')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

// const validBraintreeResponse = pipe(
//     path(['body', 'account']),
//     allPass([
//         validField('name'),
//         validField('username')
//     ]))

const validate = req => {
  // if (!validBraintreeResponse(req)) return Promise.reject('invalid stripe response')

  return req.user
}

module.exports = (req, res) =>
  validate(req)
      .then(validatedUser => {
        const new_bitcoin_address = req.body.bitcoin_address
        const old_bitcoin_addresses = req.user.bitcoin_addresses || []
        const updated_bitcoin_addresses = { bitcoin_addresses: old_bitcoin_addresses.concat(new_bitcoin_address) }
        return User.update(updated_bitcoin_addresses, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const bitcoin_address = req.body.bitcoin_address
        res.status(200).json({bitcoin_address})
      })
    .catch(error => res.status(400).json({error}))
