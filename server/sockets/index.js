const jwt = require('jsonwebtoken')
const moment = require('moment')

const { models } = rootRequire('db')
const { User, Offer, Product, Message, Thread } = models

const { merge, path, pick, isNil } = require('ramda')

const messageParams = ['id', 'text', 'state', 'product_name', 'price', 'price_type', 'threadId']

const actionHandler = require('./handlers/actions')

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {
    socket.on('action', action => actionHandler(socket, action))
    socket.on('disconnect', () => {

    })
  })
}
