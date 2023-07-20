const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 8080
const server = require('http').createServer(app)

//import mongoose config
require('./server/config/mongoose.config')
require('dotenv').config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//import routes
require('./server/routes/user.route')(app)
require('./server/routes/post.route')(app)

server.listen(port, () => console.log(`Listening on port ${port}`))
