const { models } = require('../../../db')
const { User } = models

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

// const validBraintreeResponse = pipe(
//     path(['body', 'account']),
//     allPass([
//         validField('name'),
//         validField('username')
//     ]))

const validate = req => {
  // if (!validBraintreeResponse(req)) return Promise.reject('invalid braintree response')

  return User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : user
  )
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => {
      const new_braintree_card = req.body.btResponse.creditCards[0]
      const old_braintree_cards = validatedUser.braintree_cards || []
      const updated_braintree_cards = { braintree_cards: old_braintree_cards.concat(new_braintree_card) }
      return User.update(updated_braintree_cards, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const braintree_card = req.body.btResponse.creditCards[0]
      res.status(200).json({braintree_card})
    })
    .catch(error => res.status(400).json({error}))
