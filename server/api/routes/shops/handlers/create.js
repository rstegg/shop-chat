const { models } = requireDb
const { Shop, Thread } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe, isNil } = require('ramda')

const shopAttributes = ['name', 'isPublic', 'image']

const getValidSlug = (slug, thread) =>
  new Promise(resolve =>
    Shop.findOne({
      where: { slug }
    })
    .then(shop =>
      shop ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`, thread))
        : resolve({slug, thread})
    )
  )

const createThread = (name, username, slug) =>
  Thread.create({ title: name, owner: username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : getValidSlug(slug, thread)
    )

const validate = req => {
  const slug =
    req.body.shop.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return createThread(req.body.shop.name, req.user.username, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(({slug, thread}) => {
      const newShop = merge({
        userId: req.user.id,
        threadId: thread.id,
        slug
      }, pick(shopAttributes, req.body.shop))
      return Shop.create(newShop, { plain: true })
    })
    .then(shop => res.status(200).json({shop}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
