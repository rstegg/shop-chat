const { models } = require('../../../db')
const { Shop, User } = models

module.exports = (req, res) => {
  Shop.findOne({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }],
    where: { slug: req.params.id }
  })
  .then(shop => {
    //TODO: return error if no shop found
    res.status(200).json({shop})
  })
  .catch(error => res.status(400).json({error}))
}
