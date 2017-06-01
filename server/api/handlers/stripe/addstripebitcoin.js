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

  return User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : user
  )
}

const createBitcoinSource = (user, stripeResponse) => {
    stripe.source.create({
      type: 'bitcoin',
      amount: stripeResponse.bitcoin.amount,
      currency: 'usd',
      owner: {
        email: stripeResponse.owner.email
      },
    })
    .then(res => res)
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => createBitcoinSource(validatedUser, req.body.stripeResponse))
      .then(customer => {
        const new_stripe_bitcoin = req.body.stripeResponse.bitcoin
        const old_stripe_bitcoins = req.user.stripe_bitcoins || []
        const stripe_customer = customer || req.user.stripe_customer
        const updated_stripe = { stripe_bitcoins: old_stripe_bitcoins.concat(new_stripe_bitcoin), stripe_customer }
        console.log(updated_stripe)
        return User.update(updated_stripe, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const stripe_bitcoin = req.body.stripeResponse.bitcoin
        res.status(200).json({stripe_bitcoin})
      })
    .catch((error, e) => res.status(400).json({error, e}))
