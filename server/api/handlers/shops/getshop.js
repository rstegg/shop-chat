const { models } = require('../../../db')
const { Shop, User, Thread } = models

const { pick } = require('ramda')

const shopParams = ['id', 'name', 'description', 'shop_type', 'is_public', 'slug', 'image', 'userId']

module.exports = (req, res) => {
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
    attributes: shopParams
  })
  .then(shop => res.status(200).json({shop}))
  .catch(error => res.status(400).json({error}))
}
