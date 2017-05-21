const jwt = require('jsonwebtoken')

const { models } = rootRequire('db')
const { User, Message } = models

const sendRoomChatMessage = (socket, action) => {
  // TODO: use ramda to get params from payload
  const { user, text, threadId } = action.payload
  const { username, image } = user
  if(!text.length) {
    return //TODO: user tries to send empty string
  }
  // TODO: store users with their socketIds
  const newMessage = { text, content_type: 'text', userId: socket.userId, threadId }
  Message.create(newMessage, { plain: true })
    .then(savedMessage =>
      Message.findOne({
        include: [
          {
            model: User,
            attributes: ['username', 'image']
          }
      ],
        where: { id: savedMessage.id }
      })
    )
    .then(message =>
      socket.emit('action', {
        type: 'RECEIVE_ROOM_CHAT_MESSAGE',
        payload: {
          message
        }
      })
    )
}

module.exports = { sendRoomChatMessage }
