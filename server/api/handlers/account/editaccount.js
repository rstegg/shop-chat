const { models } = require('../../../db')
const { User } = models

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const accountAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']

const validField = p => obj => !isNil(path([p], obj))

const validProfile = pipe(
    path(['body', 'account']),
    allPass([
        validField('name'),
        validField('username')
    ]))

const validate = req => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username: req.body.account.username },
      plain: true
  })
  .then(user =>
      user && user.id !== req.user.id ?
          Promise.reject('invalid user')
          : req.body.account
  )
}

const validateUsername = (req, username, id) => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username, id: { $ne: id } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : username
  )
}

module.exports = (req, res) =>
  validate(req)
    .then(validatedUser => validateUsername(req, validatedUser.username, validatedUser.id))
    .then(validatedUsername => {
      const updatedUser = merge({
        username: validatedUsername || req.body.account.username,
      }, pick(['name', 'dob', 'bio', 'website'], req.body.account))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const account = pick(accountAttributes, user[1])
      res.status(200).json({account})
    })
    .catch(error => res.status(400).json({error}))
