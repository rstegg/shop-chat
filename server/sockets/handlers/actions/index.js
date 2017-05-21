'use strict'
const jwt = require('jsonwebtoken')

const { sendRoomChatMessage } = require('./message/sendmessage')
const { fetchRoomChatMessages } = require('./message/fetchall')
const { joinChatRoom, leaveChatRoom } = require('./rooms/join')
const { sendShopOffer, sendProductOffer } = require('./offer/createoffer')
const { acceptOffer, rejectOffer } = require('./offer/editoffer')

const authorize = token =>
  new Promise((resolve, reject) => {
    return jwt.verify(token.slice(4), process.env.JWT_SECRET, (err, token) =>
      err ? reject('bad token')
      : resolve(token)
    )
  })

module.exports = (io, socket, action) => {
  // TODO: use ramda to check the type of action
  authorize(action.payload.user.token)
    .then(token => {
      socket.userId = token.id //TODO: best answer?
      switch(action.type) {
        case 'WS/SEND_ROOM_CHAT_MESSAGE':
          return sendRoomChatMessage(io, socket, action)
        case 'WS/FETCH_ROOM_CHAT_MESSAGES':
          return fetchRoomChatMessages(io, socket, action)
        case 'WS/SEND_SHOP_OFFER':
          return sendShopOffer(io, socket, action)
        // case 'WS/SEND_PRODUCT_OFFER':
        //   return sendProductOffer(io, socket, action)
        case 'WS/ACCEPT_OFFER':
          return acceptOffer(io, socket, action)
        case 'WS/REJECT_OFFER':
          return rejectOffer(io, socket, action)
        case 'WS/JOIN_ROOM':
          return joinChatRoom(io, socket, action)
        case 'WS/LEAVE_ROOM':
          return leaveChatRoom(io, socket, action)
      }
  })
  .catch(error => console.error(error))
}
