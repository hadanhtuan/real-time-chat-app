const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const userHandle = require('./utils/userControllers')
const formatMessage = require('./utils/messagesFormat')
const server = http.createServer(app)
const io = socketio(server)
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/

const PORT =  3000 ||process.env.PORT

const chatBot = 'Chatcord'


io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        const user = userHandle.addUser(socket.id, data.username, data.room)
        
        socket.join(user.room)
    
        //when new client connected
        socket.emit('message', formatMessage(chatBot, 'wellcome to the chatcord'))

        //message to another client
        socket.broadcast
        .to(user.room)
        .emit('message', formatMessage(chatBot, `${user.userName} has joined the chat`))

        io 
        .to(user.room)
        .emit('room&users', {
            room: user.room,
            userList: userHandle.getUsersByRoom(user.room)
        })

    })

    //main chat message
    socket.on('chatMessage', (msg) => { 
        const user = userHandle.getUser(socket.id)
        if(user)
        {
            io
            .to(user.room)
            .emit('message', formatMessage(user.userName, msg))
        }
    })

    //a client left the chat
    socket.on('disconnect', () => {
        const user = userHandle.removeUser(socket.id)

        if(user)
        {
            io
            .to(user.room)
            .emit('message', formatMessage(chatBot, `${user.userName} has left the chat`))

            io 
            .to(user.room)
            .emit('room&users', {
                room: user.room,
                userList: userHandle.getUsersByRoom(user.room)
            })
        }
        
    })
})

app.use(express.static('public'))
server.listen(PORT)  // big brain time 


























