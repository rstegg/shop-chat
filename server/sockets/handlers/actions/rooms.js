const joinChatRoom = (pub, sub, store, socket, action) => {
  const { roomId, username } = action.payload
  store.lrange('shop_chat_messages' + roomId, 0, -1, (e, msgs) => {
    const messages = msgs.map(msg => JSON.parse(msg))
    sub.subscribe('shop_chat' + roomId)
    socket.emit('action', {
      type: 'RECEIVE_SHOP_CHAT_MESSAGES',
      payload: {
        messages
      }
    })
  })
}

const leaveChatRoom = (pub, sub, store, socket, action) => {}

module.exports = { joinChatRoom, leaveChatRoom }
