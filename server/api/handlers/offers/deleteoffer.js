const { models } = require('../../../db')
const { Offer } = models

module.exports = (req, res) => {
  Offer.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(product => {
      res.status(200).json({product})
    })
    .catch(errror => res.status(400).json({error}))
}
