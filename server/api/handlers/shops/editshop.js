const { models } = require('../../../db')
const { Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
  path(['body', 'shop']),
  allPass([
      validField('name')
  ]))

const getValidSlug = (slug, id) =>
  new Promise(resolve =>
    Shop.findOne({
      where: { slug, id: {
          $ne: id
      }}
    })
    .then(shop => {
      if(shop) {
        return resolve(getValidSlug(Shop, `${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = (req) => {
  if (!validBody(req)) return Promise.reject('missing fields')

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
      }, pick(['name', 'shop_type', 'is_public', 'topic', 'topic_other', 'image', 'description'], req.body.shop))
      return Shop.update(updatedShop, { where: { id: req.params.id, userId: req.user.id }, returning: true, plain: true })
    })
    .then(savedShop => {
      const shop = pick(['id', 'name', 'description', 'is_public', 'slug', 'image', 'user', 'userId'], savedShop[1])
      res.status(200).json({shop})
    })
    .catch(error => res.status(400).json({error}))
}
