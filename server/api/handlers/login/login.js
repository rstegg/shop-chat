const passport = require('passport')
const jwt = require('jsonwebtoken')

const { pick } = require('ramda')

module.exports =
  function(req, res) {
    const payload = { id: req.user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    const resUser = pick(['id', 'email', 'name', 'username'], req.user) //TODO: remove sending of userID, change userId checks to username (frontend)
    res.json({ user: resUser, token: token })
  }
