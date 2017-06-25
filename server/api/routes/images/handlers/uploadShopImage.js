const { models } = requireDb
const { Shop } = models

module.exports = (req, res) =>
  Shop.update(
    { image: req.file.location },
    { where: { id: req.params.id, userId: req.user.id },
      returning: true,
      plain: true
   })
  .then(shop => res.status(200).json({image: req.file.location}))
  .catch(error => res.status(400).json({error}))
