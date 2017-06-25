const { models } = requireDb
const { Product, Shop } = models

const productParams = ['id', 'name', 'slug', 'is_public', 'description', 'gallery', 'layout', 'themes', 'category', 'sub_category', 'price', 'image', 'shopId']

module.exports = (req, res) => {
  Product.findAll({
    include: [{
      model: Shop,
      attributes: ['image', 'name', 'slug']
    }],
    where: { shopId: req.params.shopId },
    attributes: productParams
  })
  .then(products => res.status(200).json({products}))
  .catch(error => res.status(400).json({error}))
}
