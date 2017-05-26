const { models } = require('../../../db')
const { User } = models

const crypto = require('crypto')

const { allPass, path, pick, pipe, merge, isNil } = require('ramda')

const accountAttributes = ['id', 'name', 'username', 'image', 'bio', 'website']

const validField = p => obj => !isNil(path([p], obj))

const validProfile = pipe(
    path(['body', 'account']),
    allPass([
        validField('name'),
        validField('email'),
        validField('username'),
        validField('old_password')
    ]))

const account = path(['body', 'account'])
const oldPassword = path(['body', 'account', 'old_password'])
const username = path(['body', 'account', 'username'])
const userId = path(['user', 'id'])

const validate = req => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { id: req.user.id },
      plain: true
  })
  .then(user =>
      !user ? Promise.reject('invalid user')
      : validatePassword(user, req)
  )
}

const validatePassword = (user, req) =>
  !user.validPassword(oldPassword(req)) ?
    Promise.reject('invalid password')
    : validateUsername(user, req)

const validateUsername = (user, req) =>
  User.findOne({
      where: { username: username(req), id: { $ne: userId(req) } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : account(req)
  )

module.exports = (req, res) =>
  validate(req)
    .then(validAccount => {
      const reqPassword = validAccount.new_password || validAccount.old_password
      const updatedPassword = crypto.createHash('md5').update(reqPassword + req.user.salt).digest("hex")
      const updatedUser = merge({
        username: validAccount.username || req.body.account.username,
        password: updatedPassword
      }, pick(['name', 'dob', 'bio', 'website'], req.body.account))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(user => {
      const account = pick(accountAttributes, user[1])
      res.status(200).json({account})
    })
    .catch(error => res.status(400).json({error}))
