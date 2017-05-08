const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports =
  function(req, res) {
    const payload = { id: req.user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ user: req.user, token: token })
  }
