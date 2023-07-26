const socket = require('socket.io')
const User = require('../server/models/user.model')

// let activeUsers = []

module.exports.socketEvents = (server) => {
    const io = socket(server, { cors: true })

    io.on('connection', (socket) => {
        // add new User
        socket.on('new-user-add', (newUserId) => {
            //change user status to online
            User.findByIdAndUpdate(newUserId, { online: true }, { new: true })
                .then((result) => {
                    console.log('User status changed to online')
                })
                .catch((error) => {
                    console.error(error)
                })

            // // if user is not added previously
            // if (!activeUsers.some((user) => user.userId === newUserId)) {
            //     activeUsers.push(newUserId)
            //     console.log('New User Connected', activeUsers)
            // }
            // // send all active users to new user
            // io.emit('get-users', activeUsers)
        })

        // send message to a specific user
        socket.on('send-message', (data, dataUser) => {
            console.log(data)
            if (dataUser.online) {
                console.log('entre')
                io.to(data.receiverId).emit('recibir-mensaje', data)
            }
        })

        socket.on('disconnect', () => {
            // remove user from active users
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
            console.log('User Disconnected', activeUsers)
            // send all active users to all users
            io.emit('get-users', activeUsers)

            // change user status to offline
            User.findByIdAndUpdate(socket.id, { online: false }, { new: true })
                .then((result) => {
                    console.log('User status changed to offline')
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    })
}
