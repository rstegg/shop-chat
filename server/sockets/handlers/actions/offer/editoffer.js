const jwt = require('jsonwebtoken')
const moment = require('moment')

const { models } = rootRequire('db')
const { Message, User, Offer, Product } = models

const { findIndex, propEq } = require('ramda')

const offerAttributes = ['id', 'state', 'product_name', 'price', 'price_type', 'productId', 'userId', 'seller_id']

const acceptOffer = (socket, action) => {
  const { user, offer, threadId } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer => {
        const stateAccepted = { state: 'accepted' }
        return Offer.update(stateAccepted, { where: { id: validatedOffer.id } })
      })
      .then(updatedOffer =>
        Message.findAll({
          include: [
            {
              model: Offer,
              attributes: offerAttributes
            },
            {
              model: User,
              attributes: ['username', 'image']
            }
        ],
          where: { threadId }
        })
      )
      .then(messages =>
        socket.emit('action', {
          type: 'RECEIVE_ROOM_CHAT_MESSAGES',
          payload: {
            messages
          }
        })
      )
      .catch(error => console.log(error))
}

const rejectOffer = (socket, action) => {
  const { user, offer, threadId } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer => {
        const stateRejected = { state: 'rejected' }
        return Offer.update(stateRejected, { where: { id: validatedOffer.id } })
      })
      .then(updatedOffer =>
        Message.findAll({
          include: [
            {
              model: Offer,
              attributes: offerAttributes
            },
            {
              model: User,
              attributes: ['username', 'image']
            }
        ],
          where: { threadId }
        })
      )
      .then(messages =>
        socket.emit('action', {
          type: 'RECEIVE_ROOM_CHAT_MESSAGES',
          payload: {
            messages
          }
        })
      )
      .catch(error => console.log(error))
}

module.exports = { acceptOffer, rejectOffer }
