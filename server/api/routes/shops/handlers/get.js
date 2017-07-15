const { models } = requireDb
const { Shop, User, Thread } = models

const { pick } = require('ramda')

const shopAttributes = ['id', 'name', 'description', 'isPublic', 'slug', 'image', 'userId']

module.exports = (req, res) =>
  Shop.findOne({
    include: [
      {
        model: User,
        attributes: ['image', 'username']
      },
      {
        model: Thread,
        attributes: ['id', 'name', 'owner']
      }
    ],
    where: { slug: req.params.id },
    attributes: shopAttributes
  })
  .then(shop =>
    !shop ? Promise.reject('invalid shop')
    : shop
  )
  .then(shop => res.status(200).json({shop}))
  .catch(error => res.status(400).json({error}))
