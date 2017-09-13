const { Shop } = requireDb

module.exports = (req, res) =>
  Shop.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(shop => {
      res.status(200).json({shop})
    })
    .catch(errror => res.status(400).json({error}))
