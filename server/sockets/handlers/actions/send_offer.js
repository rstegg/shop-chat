
const moment = require('moment')

// const { models } = require('../../../db')
// const { Offer } = models

const sendShopOffer = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { username, avatar, product, price, roomId } = action.payload
  store.incr('roomMessageNextId' + roomId, (e, id) => {
    const timestamp = moment.utc().format()
    const is_offer = true
    const offer_state = 'open'
    const newOffer = { is_offer, offer_state, product, price, username, avatar, timestamp }
    store.hmset('room_chat_message:' + `${roomId}_${id}`, newOffer, (e, r) => {
      store.rpush('room_chat_messages' + roomId, JSON.stringify(newOffer))
      pub.publish('room_chat' + roomId, 'room_chat_message:' + `${roomId}_${id}`)
      // TODO: postgres
      // Offer.create(newOffer)
    })
  })
}

const sendProductOffer = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { username, avatar, product, price, roomId } = action.payload
  store.incr('roomMessageNextId' + roomId, (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset('room_chat_message:' + `${roomId}_${id}`, { is_offer: true, username, avatar, text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush('room_chat_messages' + roomId, JSON.stringify({ is_offer: true, offer_state: 'open', product, price, username, avatar, text: '', timestamp }))
      pub.publish('room_chat' + roomId, 'room_chat_message:' + `${roomId}_${id}`)
    })
  })
}

module.exports = { sendShopOffer, sendProductOffer }
