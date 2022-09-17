const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./api/dnd-router')
const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use("/",router)


module.exports = server;
