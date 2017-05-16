'use strict'

const { sendHomeChatMessage, sendRoomChatMessage } = require('./send_message')
const { fetchHomeChatMessages, fetchRoomChatMessages } = require('./fetch_messages')
const { joinChatRoom, leaveChatRoom } = require('./rooms')
const { sendShopOffer, sendProductOffer } = require('./offer/createoffer')
const { acceptOffer, rejectOffer } = require('./offer/editoffer')

module.exports = (pub, sub, store, socket, action) => {
  // TODO: use ramda to check the type of action
  if(action.type === 'WS/SEND_HOME_CHAT_MESSAGE') {
    sendHomeChatMessage(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/SEND_ROOM_CHAT_MESSAGE') {
    sendRoomChatMessage(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/FETCH_HOME_CHAT_MESSAGES') {
    fetchHomeChatMessages(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/FETCH_ROOM_CHAT_MESSAGES') {
    fetchRoomChatMessages(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/SEND_SHOP_OFFER') {
    sendShopOffer(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/SEND_PRODUCT_OFFER') {
    sendProductOffer(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/ACCEPT_OFFER') {
    acceptOffer(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/REJECT_OFFER') {
    rejectOffer(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/JOIN_ROOM') {
    joinChatRoom(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/LEAVE_ROOM') {
    leaveChatRoom(pub, sub, store, socket, action)
  }
}
