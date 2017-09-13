const { Shop, User } = requireDb

module.exports = (req, res) =>
  Shop.findAll({where: { userId: req.user.id }})
    .then(shops => res.status(200).json({shops}))
    .catch(error => res.status(400).json({error}))
