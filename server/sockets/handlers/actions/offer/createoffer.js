const jwt = require('jsonwebtoken')
const moment = require('moment')

const { models } = rootRequire('db')
const { User, Offer, Product } = models

const sendShopOffer = (pub, sub, store, socket, action) => {
  const { user, productId, price, roomId } = action.payload
  const { username, image, token } = user
  const avatar = image
  jwt.verify(token.slice(4), process.env.JWT_SECRET, (err, token) => {
    if(err) {
      console.log(err)
    }
    if(!err) {
      //TODO: check if user is in roomId
      store.incr('roomMessageNextId' + roomId, (e, id) => {
        Product.findOne({
          include: [{
            model: User,
            attributes: ['id']
          }],
          where: { id: productId }
        })
        .then(product =>
          !product ? Promise.reject('Invalid product id')
          : product
        )
        .then(validatedProduct => {
          const userId = user.id
          const sellerId = validatedProduct.user.id
          const product_name = validatedProduct.name
          const productId = validatedProduct.id
          const msgId = `room_chat_message:${roomId}_${id}`
          const savedOffer = { state: 'open', product_name, sellerId, price, roomId, msgId, productId, userId }
          return Offer.create(savedOffer, { plain: true })
        })
        .then(offer => {
          const timestamp = moment.utc().format()
          const { state, productId, product_name, userId, sellerId, price } = offer
          const is_offer = true
          const newOffer = { id: offer.id, is_offer, state, productId, product_name, userId, sellerId, price, username, avatar, timestamp }
          store.hmset(`room_chat_message:${roomId}_${id}`, newOffer, (e, r) => {
            store.rpush(`room_chat_messages_${roomId}`, JSON.stringify(newOffer))
            pub.publish(`room_chat${roomId}`, `room_chat_message:${roomId}_${id}`)
          })
        })
        .catch(error => console.log(error))
      })
    }
  })
}

const sendProductOffer = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { username, image, product, price, roomId } = action.payload
  store.incr('roomMessageNextId' + roomId, (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset('room_chat_message:' + `${roomId}_${id}`, { is_offer: true, username, avatar, text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush(`room_chat_messages_${roomId}`, JSON.stringify({ is_offer: true, offer_state: 'open', product, price, username, avatar, text: '', timestamp }))
      pub.publish(`room_chat${roomId}`, 'room_chat_message:' + `${roomId}_${id}`)
    })
  })
}

module.exports = { sendShopOffer, sendProductOffer }
