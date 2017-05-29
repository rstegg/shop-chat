const router = require('express').Router()
const passport = require('passport')

const editShippingHandler = require('../handlers/shipping/editshipping')
const getShippingHandler = require('../handlers/shipping/getshipping')

module.exports = () => {
  router.use(passport.authenticate('jwt', { session: false }))
  .get(`/shipping`,
    getShippingHandler
  )
  .put(`/shipping`,
    editShippingHandler
  )

  return router
}
