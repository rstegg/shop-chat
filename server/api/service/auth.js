const { models } = require('../../db')
const { User } = models

const jwt = require('jsonwebtoken')

const passport = require('passport')

const passportJWT = require("passport-jwt")
const passportLocal = require("passport-local")

module.exports = () => {

  const { ExtractJwt, Strategy: JwtStrategy } = passportJWT
  const { Strategy: LocalStrategy } = passportLocal

  const localStrategy = new LocalStrategy(
    (username, password, done) =>
      User.findOne({ where: { username: username } })
        .then(user =>
          !user ? done(null, false, { error: 'Incorrect username' })
          : !user.validPassword(password) ? done(null, false, { error: 'Incorrect password' })
          : done(null, user)
        )
        .catch(err => done(err))
  )

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
  jwtOptions.secretOrKey = process.env.JWT_SECRET
  jwtOptions.ignoreExpiration = true

  const jwtStrategy = new JwtStrategy(jwtOptions,
    (jwt_payload, done) =>
      User.findById(jwt_payload.id)
        .then(user =>
          !user ? done(null, false, { error: 'Invalid token' })
          : done(null, user)
        )
        .catch(err => done(err))
  )

  passport.use(jwtStrategy)
  passport.use(localStrategy)
}
