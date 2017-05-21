const { models } = require('../../../db')
const { User, Thread } = models

const threadAttributes = ['id', 'name', 'owner']
const profileAttributes = ['id', 'name', 'username', 'image', 'bio']

const validate = req => {
  return User.findOne({
    include: [
      {
        model: Thread,
        attributes: threadAttributes
      }
    ],
    where: { username: req.params.id },
    attributes: profileAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : user
  )
}

module.exports = (req, res) => {
  validate(req)
    .then(profile => res.status(200).json({profile}))
    .catch(error => res.status(400).json({error}))
}
