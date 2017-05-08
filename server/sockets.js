'use strict'

const R = require('ramda')

const { models } = require('./db')
const { User, Room } = models

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {
    //name, device -> registerUserOnline
    socket.on('joinserver', (name, device) => {
			User.findOne({where: { username: name }})
        .then(user =>
          !user ?
            Promise.reject('No user')
            : user
        )
        .then(validatedUser => {
          /*
          * do socket stuff about connecting
          * AKA this is where we cache the user, store the relative info (socketId, userId, username, etc) and device? "in"rooms? (rooms the user is in)
          */
          socket.emit('update', 'You have connected to the server.') //Tell the user that they are connected to chat
          io.sockets.emit('update', validatedUser.username + ' is online.') //Tell the world that the user is connected to chat (TODO: Maybe not?)
          Room.findAll()
            .then(rooms => {
              socket.emit('roomList', {rooms, count: R.size(rooms)})
            })
          User.findAll({where: { online: true }})
            .then(users => {
              io.sockets.emit('update-onliners', {users, count: R.size(users)})
            })
          socket.emit('joined') //extra emit for GeoLocation
          SocketList.findOrCreate(socket, { where: { socketId: socket.id } }) //Store a list of all the sockets? TODO: maybe a better approach
            .then(socket => console.log(socket))
        })
  	})

	  socket.on('getOnlineUsers', fn =>
      User.findAll({where: { online: true }})
        .then(fn) //getOnlineusers gives a function, returns the list of online users mapped to the fn ? TODO: maybe better approach
      )

  	socket.on('countryUpdate', data =>
      User.update({country: data.country.toLowerCase()}, { where: { socketId: socket.id }, returning: true, plain: true })
        .then(user =>
          User.findAll({where: { online: true }})
            .then(users =>
            io.sockets.emit('update-users', {users: people, count: R.size(users)})
          )
        )
  	  )

	socket.on('typing', data => {
    User.findOne({where: { socketId: socket.id } })
      .then(user =>
        user ?
          io.sockets.in(socket.room).emit('isTyping', {isTyping: data, username: user.username})
          : null
      )
	})

	socket.on('send', (msTime, msg) => {
		if (io.sockets.manager.roomClients[socket.id]['/'+socket.room] !== undefined ) {
      //Update room with msTime and msg?
			io.sockets.in(socket.room).emit('chat', msTime, people[socket.id], msg)
			socket.emit('isTyping', false)
			if (R.size(chatHistory[socket.room]) > 10) {
				chatHistory[socket.room].splice(0,1)
			} else {
				chatHistory[socket.room].push(people[socket.id].name + ': ' + msg)
			}
	  } else {
			socket.emit('update', 'Please connect to a room.')
	  }
	})

	socket.on('disconnect', () => {
		if (typeof people[socket.id] !== 'undefined') { //this handles the refresh of the name screen
			// purge(socket, 'disconnect')
      /*
      * handle socket disconnect (update users, etc)
      */
		}
	})

	//Room functions
	socket.on('createRoom', name => {
		if (people[socket.id].inroom) {
			socket.emit('update', 'You are in a room. Please leave it first to create your own.')
		} else if (!people[socket.id].owns) {
			var id = uuid.v4()
			var room = new Room(name, id, socket.id)
			rooms[id] = room
			sizeRooms = R.size(rooms)
			io.sockets.emit('roomList', {rooms: rooms, count: sizeRooms})
			//add room to socket, and auto join the creator of the room
			socket.room = name
			socket.join(socket.room)
			people[socket.id].owns = id
			people[socket.id].inroom = id
			room.addPerson(socket.id)
			socket.emit('update', 'Welcome to ' + room.name + '.')
			socket.emit('sendRoomID', {id: id})
			chatHistory[socket.room] = []
		} else {
			socket.emit('update', 'You have already created a room.')
		}
	})

	socket.on('check', (name, fn) => {
		var match = false
		R.find(rooms, (key,value) => {
			if (key.name === name)
				return match = true
		})
		fn({result: match})
	})

	socket.on('removeRoom', id => {
		 /*
     * TODO: add remove room functionality?
     */
	})

	socket.on('joinRoom', id => {
		if (typeof people[socket.id] !== 'undefined') {
			var room = rooms[id]
			if (socket.id === room.owner) {
				socket.emit('update', 'You are the owner of this room and you have already been joined.')
			} else {
				if (R.contains((room.people), socket.id)) {
					socket.emit('update', 'You have already joined this room.')
				} else {
					if (people[socket.id].inroom !== null) {
				    		socket.emit('update', 'You are already in a room ('+rooms[people[socket.id].inroom].name+'), please leave it first to join another room.')
				    	} else {
						room.addPerson(socket.id)
						people[socket.id].inroom = id
						socket.room = room.name
						socket.join(socket.room)
						user = people[socket.id]
						io.sockets.in(socket.room).emit('update', user.name + ' has connected to ' + room.name + ' room.')
						socket.emit('update', 'Welcome to ' + room.name + '.')
						socket.emit('sendRoomID', {id: id})
						var keys = R.keys(chatHistory)
						if (R.contains(keys, socket.room)) {
							socket.emit('history', chatHistory[socket.room])
						}
					}
				}
			}
		} else {
			socket.emit('update', 'Please enter a valid name first.')
		}
	})

	socket.on('leaveRoom', id => {
		Room.findOne({where: { id }})
      .then(room =>
        room ?
          updateOnlineUsers()
          : null
      )
	})
}
