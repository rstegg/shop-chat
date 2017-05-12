const fetchHomeChatMessages = (pub, sub, store, socket, action) => {
  store.lrange('home_chat_messages', 0, -1, (e, msgs) => {
    const messages = msgs.map(msg => JSON.parse(msg))
    socket.emit('action', {
      type: 'RECEIVE_HOME_CHAT_MESSAGES',
      payload: {
        messages
      }
    })
  })
}

const fetchShopChatMessages = (pub, sub, store, socket, action) => {
  const { roomId } = action.payload
  store.lrange('shop_chat_messages'+roomId, 0, -1, (e, msgs) => {
    const messages = msgs.map(msg => JSON.parse(msg))
    socket.emit('action', {
      type: 'RECEIVE_SHOP_CHAT_MESSAGES',
      payload: {
        messages
      }
    })
  })
}

module.exports = { fetchHomeChatMessages, fetchShopChatMessages }
