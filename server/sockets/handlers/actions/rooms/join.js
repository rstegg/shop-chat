const jwt = require('jsonwebtoken')
const moment = require('moment')

const { models } = rootRequire('db')
const { User, Offer, Message } = models

const offerParams = ['id', 'state', 'product_name', 'price', 'price_type', 'productId', 'userId', 'seller_id']

const joinChatRoom = (socket, action) => {
  const { threadId, user } = action.payload
  Message.findAll({
    include: [
      {
        model: Offer,
        attributes: offerParams
      },
      {
        model: User,
        attributes: ['username', 'image']
      }
    ],
    where: { threadId }
  })
  .then(messages =>
    socket.emit('action', {
      type: 'JOIN_ROOM_SUCCESS',
      payload: {
        messages,
        threadId
      }
    })
  )
}

const leaveChatRoom = (socket, action) => {}

module.exports = { joinChatRoom, leaveChatRoom }
