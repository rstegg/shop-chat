const jwt = require('jsonwebtoken')
const moment = require('moment')

const { models } = rootRequire('db')
const { User, Offer, Product } = models

const { findIndex, propEq } = require('ramda')

const acceptOffer = (pub, sub, store, socket, action) => {
  const { user, offer } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
  const avatar = image
  jwt.verify(token.slice(4), process.env.JWT_SECRET, (err, token) => {
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer => {
        const stateAccepted = { state: 'accepted' }
        return Offer.update(stateAccepted, { where: { id: validatedOffer.id }, returning: true, plain: true })
      })
      .then(updatedOffer => {
        const { state, productId, product_name, userId, roomId, msgId, sellerId, price } = updatedOffer[1]
        const is_offer = true
        const acceptedOffer = { id: offer.id, is_offer, state, productId, product_name, userId, sellerId, price, username, avatar, timestamp }
        store.hmset(msgId, acceptedOffer, (e, r) => {
          store.lrange(`room_chat_messages_${roomId}`, 0, -1, (e, msgs) => {
            const parsedMsgs = msgs.map(msg => JSON.parse(msg))
            const getMsgIndex = findIndex(propEq('id',parseInt(offer.id, 10)))
            const msgIndex = getMsgIndex(parsedMsgs)
            store.lset(`room_chat_messages_${roomId}`, msgIndex, JSON.stringify(acceptedOffer), (e, r) => {
              store.lrange(`room_chat_messages_${roomId}`, 0, -1, (e, msgs) => {
                const messages = msgs.map(msg => JSON.parse(msg))
                socket.emit('action', {
                  type: 'RECEIVE_ROOM_CHAT_MESSAGES',
                  payload: {
                    messages,
                    roomId
                  }
                })
              })
            })
          })
        })
      })
      .catch(error => console.log(error))
  })
}

const rejectOffer = (pub, sub, store, socket, action) => {
  const { user, offer } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
  const avatar = image
  jwt.verify(token.slice(4), process.env.JWT_SECRET, (err, token) => {
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer => {
        const stateRejected = { state: 'rejected' }
        return Offer.update(stateRejected, { where: { id: validatedOffer.id }, returning: true, plain: true })
      })
      .then(updatedOffer => {
        const { state, productId, product_name, userId, roomId, msgId, sellerId, price } = updatedOffer[1]
        const is_offer = true
        const rejectedOffer = { id: offer.id, is_offer, state, productId, product_name, userId, sellerId, price, username, avatar, timestamp }
        store.hmset(msgId, rejectedOffer, (e, r) => {
          store.lrange(`room_chat_messages_${roomId}`, 0, -1, (e, msgs) => {
            const parsedMsgs = msgs.map(msg => JSON.parse(msg))
            const getMsgIndex = findIndex(propEq('id',parseInt(offer.id, 10)))
            const msgIndex = getMsgIndex(parsedMsgs)
            store.lset(`room_chat_messages_${roomId}`, msgIndex, JSON.stringify(rejectedOffer), (e, r) => {
              store.lrange(`room_chat_messages_${roomId}`, 0, -1, (e, msgs) => {
                const messages = msgs.map(msg => JSON.parse(msg))
                socket.emit('action', {
                  type: 'RECEIVE_ROOM_CHAT_MESSAGES',
                  payload: {
                    messages,
                    roomId
                  }
                })
              })
            })
          })
        })
      })
      .catch(error => console.log(error))
  })
}

module.exports = { acceptOffer, rejectOffer }
