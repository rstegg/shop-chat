const router = require('express').Router()
const passport = require('passport')

const createOfferHandler = require('../handlers/offers/createoffer')
const editOfferHandler = require('../handlers/offers/editoffer')
const getOffersHandler = require('../handlers/offers/getoffers')
const getOfferHandler = require('../handlers/offers/getoffer')
const deleteOfferHandler = require('../handlers/offers/deleteoffer')

module.exports = () => {

  router.get(`/shop/:shopId/offer/:id`,
    getOfferHandler
  )
  .use(passport.authenticate('jwt', { session: false }))
  .get(`/shop/:shopId/offers`,
    getOffersHandler
  )
  .post(`/shop/:shopId/offers`,
    createOfferHandler
  )
  .put(`/shop/:shopId/offer/:id`,
    editOfferHandler
  )
  .delete(`/shop/:shopId/offer/:id`,
    deleteOfferHandler
  )

  return router
}
