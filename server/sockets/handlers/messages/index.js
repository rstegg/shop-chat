'use strict'

const isHomeMessage = msg => msg.match('home_chat_message')
const isRoomMessage = msg => msg.match('room_chat_message')

module.exports = (store, socket, message) => {
  if(isHomeMessage(message)) {
    store.hgetall(message, (err, obj) => {
      socket.emit('action', {
        type: 'RECEIVE_HOME_CHAT_MESSAGE',
        payload: {
          message: obj
        }
      })
    })
  } else if(isRoomMessage(message)) {
    store.hgetall(message, (err, obj) => {
      socket.emit('action', {
        type: 'RECEIVE_ROOM_CHAT_MESSAGE',
        payload: {
          message: obj
        }
      })
    })
  }
}
