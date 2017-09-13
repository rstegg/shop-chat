const { Product, Shop, User, Thread } = requireDb
const { curry } = require('ramda')

const productParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const SingleProductAssociations = [
  {
    model: Shop,
    attributes: ['image', 'name', 'slug']
  },
  {
    model: User,
    attributes: ['id', 'username', 'image']
  },
  {
    model: Thread,
    attributes: ['id', 'name', 'owner']
  }
]

module.exports = (req, res) =>
  Shop.findShopBySlug(req.params.shopId)
  .then(Product.getProductsByShop(req.params.id))
  .then(product => res.status(200).json({product}))
  .catch(error => res.status(400).json({error}))
