const joinChatRoom = (pub, sub, store, socket, action) => {
  const { roomId, username } = action.payload
  store.lrange(`room_chat_messages_${roomId}`, 0, -1, (e, msgs) => {
    const messages = msgs.map(msg => JSON.parse(msg))
    sub.subscribe(`room_chat${roomId}`)
    socket.emit('action', {
      type: 'JOIN_ROOM_SUCCESS',
      payload: {
        messages,
        roomId
      }
    })
  })
}

const leaveChatRoom = (pub, sub, store, socket, action) => {}

module.exports = { joinChatRoom, leaveChatRoom }
