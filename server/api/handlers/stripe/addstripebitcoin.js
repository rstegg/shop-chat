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
        const new_stripe_bitcoin = req.body.stripe_bitcoin
        const old_stripe_bitcoins = req.user.stripe_bitcoins || []
        const updated_stripe_bitcoins = { stripe_bitcoins: old_stripe_bitcoins.concat(new_stripe_bitcoin) }
        return User.update(updated_stripe_bitcoins, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const stripe_bitcoin = req.body.stripe_bitcoin
        res.status(200).json({stripe_bitcoin})
      })
    .catch(error => res.status(400).json({error}))
