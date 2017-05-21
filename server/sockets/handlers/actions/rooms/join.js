const { models } = rootRequire('db')
const { User, Offer, Message } = models

const offerAttributes = ['id', 'state', 'product_name', 'price', 'price_type', 'productId', 'userId', 'seller_id']
const userAttributes = ['id', 'username', 'image']

const joinChatRoom = (socket, action) => {
  const { threadId, user } = action.payload
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
      type: 'JOIN_ROOM_SUCCESS',
      payload: {
        messages
      }
    })
  )
}

const leaveChatRoom = (socket, action) => {}

module.exports = { joinChatRoom, leaveChatRoom }
