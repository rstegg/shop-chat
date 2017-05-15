const { models } = require('../../../db')
const { Shop } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const validField = p => obj => !isNil(path([p], obj))

const validBody = pipe(
    path(['body', 'shop']),
    allPass([
        validField('name'),
        validField('is_public')
    ]))

const getValidSlug = slug =>
  new Promise(resolve =>
    Shop.findOne({
      where: { slug }
    })
    .then(shop => {
      if(shop) {
        return resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.shop.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const newShop = merge({
        userId: req.user.id,
        slug
      }, pick(['name', 'is_public'], req.body.shop))
      return Shop.create(newShop, { plain: true })
    })
    .then(shop => res.status(200).json({shop}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
}
