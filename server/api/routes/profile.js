const router = require('express').Router()
const passport = require('passport')

const editProfileHandler = require('../handlers/profile/editprofile')
const getProfileHandler = require('../handlers/profile/getprofile')

module.exports =
  router
    .get(`/:username`,
      getProfileHandler
    )
    .put(`/`,
      passport.authenticate('jwt', { session: false }),
      editProfileHandler
    )
