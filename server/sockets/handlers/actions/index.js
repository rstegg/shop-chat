'use strict'

const { sendHomeChatMessage, sendShopChatMessage } = require('./send_message')
const { fetchHomeChatMessages, fetchShopChatMessages } = require('./fetch_messages')
const { joinChatRoom, leaveChatRoom } = require('./rooms')

module.exports = (pub, sub, store, socket, action) => {
  // TODO: use ramda to check the type of action
  if(action.type === 'WS/SEND_HOME_CHAT_MESSAGE') {
    sendHomeChatMessage(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/SEND_SHOP_CHAT_MESSAGE') {
    sendShopChatMessage(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/FETCH_HOME_CHAT_MESSAGES') {
    fetchHomeChatMessages(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/FETCH_SHOP_CHAT_MESSAGES') {
    fetchShopChatMessages(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/JOIN_ROOM') {
    joinChatRoom(pub, sub, store, socket, action)
  }

  if(action.type === 'WS/LEAVE_ROOM') {
    leaveChatRoom(pub, sub, store, socket, action)
  }
}
