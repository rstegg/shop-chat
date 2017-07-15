const { models } = requireDb
const { Product, Shop, User, Thread } = models

const productParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

module.exports = (req, res) => {
  Shop.findOne({
    where: { slug: req.params.shopId },
    attributes: ['id']
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid shop id')
    : shop
  )
  .then(shop =>
    Product.findOne({
      include: [
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
      ],
      where: { slug: req.params.id, shopId: shop.id },
      attributes: productParams
    })
  )
  .then(product =>
    !product ? Promise.reject('Invalid product id')
    : product
  )
  .then(product => res.status(200).json({product}))
  .catch(error => res.status(400).json({error}))
}
