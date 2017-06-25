const { models } = requireDb
const { Product } = models

module.exports = (req, res) =>
  Product.update(
    { image: req.file.location },
    { where: { id: req.params.id, shopId: req.params.shopId, userId: req.user.id },
      returning: true,
      plain: true
   })
  .then(shop => res.status(200).json({image: req.file.location}))
  .catch(error => res.status(400).json({error}))
