const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const server = require('http').createServer(app)




//import mongoose config
require('./server/config/mongoose.config')
require('dotenv').config()

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//import routes
require('./server/routes/user.route')(app)
require('./server/routes/post.route')(app)
require('./server/routes/upload.route')(app)

server.listen(port, () => console.log(`Listening on port ${port}`))
