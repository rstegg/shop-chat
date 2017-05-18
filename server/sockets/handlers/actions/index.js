'use strict'

const { sendHomeChatMessage, sendRoomChatMessage } = require('./send_message')
const { fetchHomeChatMessages, fetchRoomChatMessages } = require('./fetch_messages')
const { joinChatRoom, leaveChatRoom } = require('./rooms')
const { sendShopOffer, sendProductOffer } = require('./offer/createoffer')
const { acceptOffer, rejectOffer } = require('./offer/editoffer')

module.exports = (pub, sub, store, socket, action) => {
  // TODO: use ramda to check the type of action
  switch(action.type) {
    case 'WS/SEND_HOME_CHAT_MESSAGE':
      return sendHomeChatMessage(pub, sub, store, socket, action)
    case 'WS/SEND_ROOM_CHAT_MESSAGE':
      return sendRoomChatMessage(pub, sub, store, socket, action)
    case 'WS/FETCH_HOME_CHAT_MESSAGES':
      return fetchHomeChatMessages(pub, sub, store, socket, action)
    case 'WS/FETCH_ROOM_CHAT_MESSAGES':
      return fetchRoomChatMessages(pub, sub, store, socket, action)
    case 'WS/SEND_SHOP_OFFER':
      return sendShopOffer(pub, sub, store, socket, action)
    case 'WS/SEND_PRODUCT_OFFER':
      return sendProductOffer(pub, sub, store, socket, action)
    case 'WS/ACCEPT_OFFER':
      return acceptOffer(pub, sub, store, socket, action)
    case 'WS/REJECT_OFFER':
      return rejectOffer(pub, sub, store, socket, action)
    case 'WS/JOIN_ROOM':
      return joinChatRoom(pub, sub, store, socket, action)
    case 'WS/LEAVE_ROOM':
      return leaveChatRoom(pub, sub, store, socket, action)
  }
}
