const { models } = require('../../../db')
const { Product, Shop } = models

const productParams = ['id', 'name', 'slug', 'description', 'category', 'sub_category', 'price_type', 'price', 'image', 'shopId']

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
