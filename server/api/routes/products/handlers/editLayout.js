const { Product } = requireDb
const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const productParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'userId']

const validate = req =>
  Product.findOne({
    where: { id: req.params.id, userId: req.user.id }
  })
  .then(product =>
    !product ? Promise.reject('Invalid permission')
    : product
  )

module.exports = (req, res) =>
  validate(req)
    .then(product => {
      const updatedProduct = {
        layout: req.body.layout
      }
      return Product.update(updatedProduct, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedProduct => {
      const product = pick(productParams, savedProduct[1])
      res.status(200).json({product})
    })
    .catch(error => res.status(400).json({error}))
