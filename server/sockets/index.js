const redis = require('redis')
const store = redis.createClient()
const pub = redis.createClient()

const actionHandler = require('./handlers/actions')
const messageHandler = require('./handlers/messages')

// uncomment this line for fresh db
// store.flushdb()

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {

    // When a socket connection is made, the socket should be subscribed to listen for new chat events
    const sub = redis.createClient()
    sub.subscribe('home_chat')

    // When a flux action is emitted it should be handled in a custom reducer
    socket.on('action', action => actionHandler(pub, sub, store, socket, action))
    // When a chat event is published it should be pushed out throu the sockets of all active subscribers
    sub.on('message', (pattern, message) => messageHandler(store, socket, message))
    // When a socket disconnects it should be unsubscribed from chat messages
    socket.on('disconnect', () => {
      sub.unsubscribe()
      sub.quit()
    })
  })
}
