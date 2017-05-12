
const moment = require('moment')

const isDirty = text => text.indexOf('<') > -1 || text.indexOf('>') > -1

const sanitise = text =>
  isDirty(text) ?
    text.replace(/</g, '&lt').replace(/>/g, '&gt')
    : text

const sendHomeChatMessage = (pub, sub, store, socket, action) => {
  console.log(action);
  // TODO: use ramda to get params from payload
  const { username, avatar, text } = action.payload
  const sanitised_text = sanitise(text)
  store.incr('homeMessageNextId', (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset('home_chat_message:' + id, { username, avatar, text: sanitised_text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush('home_chat_messages', JSON.stringify({ username, avatar, text: sanitised_text, timestamp }))
      pub.publish('home_chat', 'home_chat_message:' + id)
    })
  })
}

const sendShopChatMessage = (pub, sub, store, socket, action) => {
  // TODO: use ramda to get params from payload
  const { username, avatar, text, roomId } = action.payload
  const sanitised_text = sanitise(text)
  store.incr('roomMessageNextId' + roomId, (e, id) => {
    // TODO: store users with their socketIds
    const timestamp = moment.utc().format()
    // When a new message gets pushed through the socket, it should add the new message to the redis store with the user info too
    store.hmset('shop_chat_message:' + `${roomId}_${id}`, { username, avatar, text: sanitised_text, timestamp }, (e, r) => {
    // When a new message gets pushed through the socket a chat event should be published to all subscribers
      store.rpush('shop_chat_messages' + roomId, JSON.stringify({ username, avatar, text: sanitised_text, timestamp }))
      pub.publish('shop_chat' + roomId, 'shop_chat_message:' + `${roomId}_${id}`)
    })
  })
}

module.exports = { sendHomeChatMessage, sendShopChatMessage }
