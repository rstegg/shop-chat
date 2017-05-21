const actionHandler = require('./handlers/actions')

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {
    socket.on('action', action => actionHandler(socket, action))
    socket.on('disconnect', () => {
      //TODO: cleanup sockets?
    })
  })
}
