const { models } = require('../../../db')
const { User, Shop, Thread } = models
const { merge, pick } = require('ramda')

const threadAttributes = ['id', 'name', 'owner']
const profileAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']
const shopAttributes = ['id', 'name', 'description', 'shop_type', 'is_public', 'slug', 'image']

const getShops = user =>
  Shop.findAll({
    where: { userId: user.id },
    attributes: shopAttributes
  })
  .then(shops => merge({ shops }, pick(profileAttributes, user)))

const validate = req =>
  User.findOne({
    include: [
      {
        model: Thread,
        attributes: threadAttributes
      }
    ],
    where: { username: req.params.id },
    attributes: profileAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(user => getShops(user))
    .then(profile => res.status(200).json({profile}))
    .catch(error => res.status(400).json({error}))
