const { models } = require('../../../db')
const { User } = models

module.exports = function(req, res) {
  User.update(
    { image: req.file.location },
    { where: { id: req.user.id },
    returning: true,
    plain: true })
    .then(function(profile) {
      res.status(200).json({image: req.file.location})
    })
    .catch(function(err) {
      res.status(400).json({error: 'Bad request'})
    })
}
