const { models } = require('../../../db')
const { User, Thread } = models

const { pick } = require('ramda')

const validate = req => {
  return User.findOne({
    include: [
      {
        model: Thread,
        attributes: ['id', 'name', 'owner']
      }
    ],
    where: { username: req.params.id }
  })
  .then(user =>
      !user ?
          Promise.reject('invalid username')
          : user
  )
}

module.exports = (req, res) => {
  validate(req)
    .then(validatedUser => {
      const profile = pick(['id', 'name', 'username', 'image', 'bio'], validatedUser)
      res.status(200).json({profile})
    })
    .catch(error => res.status(400).json({error}))
}
