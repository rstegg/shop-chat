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

const findOrCreateStripeCustomer = (user, stripeToken) => {
  if(user.stripe_customer) {
    stripe.customers.create({
      description: `Customer for ${user.username}`,
      source: stripeToken
    })
    .then(res => res)
  } else {
    stripe.customers.update(user.stripe_customer.id, {
      source: stripeToken
    })
    .then(res => res)
  }
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => findOrCreateStripeCustomer(validatedUser, req.body.stripeResponse.id))
      .then(customer => User.update({ stripe_customer: customer }, { where: { id: req.user.id }, returning: true, plain: true }))
      .then(user => {
        const new_stripe_card = req.body.stripeResponse.card
        const old_stripe_cards = req.user.stripe_cards || []
        const updated_stripe_cards = { stripe_cards: old_stripe_cards.concat(new_stripe_card) }
        return User.update(updated_stripe_cards, { where: { id: req.user.id }, returning: true, plain: true })
      })
      .then(user => {
        const stripe_card = req.body.stripeResponse.card
        res.status(200).json({stripe_card})
      })
    .catch(error => res.status(400).json({error}))
