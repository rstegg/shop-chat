const { models } = requireDb
const { Product, Shop, Thread } = models

const shortId = require('shortid')

const { merge, pick } = require('ramda')

const productParams = ['id', 'name', 'slug', 'isPublic', 'description', 'gallery', 'layout', 'themes', 'category', 'subCategory', 'price', 'image', 'shopId']

const defaultTheme = {
  rgb: {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  }
}

const defaultFontTheme = {
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
}

const defaultThemes = {
  primary: defaultTheme,
  secondary: defaultTheme,
  background: defaultTheme,
  segment: defaultTheme,
  font: defaultFontTheme,
}

const getValidSlug = (slug, shopId, thread) =>
  new Promise(resolve =>
    Product.findOne({
      where: { slug, shopId }
    })
    .then(product =>
      product ?
        resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`), shopId)
        : resolve({slug, thread})
    )
  )

const createThread = (shopId, username, slug) =>
  Thread.create({ title: slug, owner: username }, { plain: true })
    .then(thread =>
      !thread ? Promise.reject('Thread not created')
      : getValidSlug(slug, shopId, thread)
    )

const getValidParams = (shopId, userId, slug) =>
  Shop.findOne({
    where: { id: shopId, userId }
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid permission')
    : createThread(shopId, userId, slug)
  )

const validate = req => {
  const slug =
    req.body.product.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidParams(req.params.shopId, req.user.id, slug)
}

module.exports = (req, res) =>
  validate(req)
    .then(({slug, thread}) => {
      const newProduct = merge({
        slug,
        themes: defaultThemes,
        shopId: req.params.shopId,
        threadId: thread.id,
        userId: req.user.id
      }, pick(productParams, req.body.product))
      return Product.create(newProduct, { plain: true })
    })
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
