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
    const sub = redis.createClient()
    sub.subscribe('home_chat') // TODO: move this subscribe to a 'JOIN_HOME' action?

    socket.on('action', action => actionHandler(pub, sub, store, socket, action))

    sub.on('message', (pattern, message) => messageHandler(store, socket, message))

    socket.on('disconnect', () => {
      sub.unsubscribe()
      sub.quit()
    })
  })
}
