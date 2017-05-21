const jwt = require('jsonwebtoken')

const { models } = rootRequire('db')
const { User, Offer, Message } = models

const offerAttributes = ['id', 'state', 'product_name', 'price', 'seller_id']
const userAttributes = ['id', 'username', 'image']

const fetchRoomChatMessages = (socket, action) => {
  const { threadId } = action.payload
  Message.findAll({
    include: [
      {
        model: Offer,
        attributes: offerAttributes
      },
      {
        model: User,
        attributes: userAttributes
      }
    ],
    where: { threadId }
  })
  .then(messages =>
    socket.emit('action', {
      type: 'RECEIVE_ROOM_CHAT_MESSAGES',
      payload: {
        messages
      }
    })
  )
}

module.exports = { fetchRoomChatMessages }
