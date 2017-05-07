const { models } = require('../../../db')
const { Shop, User } = models

module.exports = (req, res) => {
  Shop.findAll({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }], where: { userId: req.user.id }})
    .then(shops => res.status(200).json({shops}))
    .catch(error => res.status(400).json({error}))
}
