'use strict'

module.exports = (store, socket, message) => {
  if(message.match('home_chat_message')) {
    store.hgetall(message, (err, obj) => {
      //send client the message {username, avatar, text}
      socket.emit('action', {
        type: 'RECEIVE_HOME_CHAT_MESSAGE',
        payload: {
          message: obj
        }
      })
    })
  }
  console.log(message);

  if(message.match('shop_chat_message')) {
    store.hgetall(message, (err, obj) => {
      socket.emit('action', {
        type: 'RECEIVE_SHOP_CHAT_MESSAGE',
        payload: {
          message: obj
        }
      })
    })
  }
}
