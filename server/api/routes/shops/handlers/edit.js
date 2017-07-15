const { models } = requireDb
const { Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const shopAttributes = ['name', 'isPublic', 'image', 'description']

const getValidSlug = (slug, id) =>
  new Promise(resolve =>
    Shop.findOne({
      where: { slug, id: {
          $ne: id
      }}
    })
    .then(shop =>
      !shop ? resolve(slug)
      : resolve(getValidSlug(Shop, `${slug}-${shortId.generate().slice(0,1)}`))
    )
  )

const validate = req => {
  const slug =
    req.body.shop.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug, req.params.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const updatedShop = merge({
        slug
      }, pick(shopAttributes, req.body.shop))
      return Shop.update(updatedShop, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedShop => {
      const shop = pick(['id', 'name', 'description', 'isPublic', 'slug', 'image', 'user', 'userId'], savedShop[1])
      res.status(200).json({shop})
    })
    .catch(error => res.status(400).json({error}))
}
