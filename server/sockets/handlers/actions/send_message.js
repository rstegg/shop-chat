
const moment = require('moment')

const sendHomeChatMessage = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { user, text } = action.payload
  const { username, image } = user
  store.incr('homeMessageNextId', (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset('home_chat_message:' + id, { username, avatar: image, text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush('home_chat_messages', JSON.stringify({ username, avatar: image, text, timestamp }))
      pub.publish('home_chat', 'home_chat_message:' + id)
    })
  })
}

const sendRoomChatMessage = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { user, text, roomId } = action.payload
  const { username, image } = user
  store.incr(`roomMessageNextId${roomId}`, (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset(`room_chat_message:${roomId}_${id}`, { username, avatar: image, text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush(`room_chat_messages_${roomId}`, JSON.stringify({ username, avatar: image, text, timestamp }))
      pub.publish(`room_chat${roomId}`, `room_chat_message:${roomId}_${id}`)
    })
  })
}

module.exports = { sendHomeChatMessage, sendRoomChatMessage }
