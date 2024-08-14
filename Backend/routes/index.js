const express = require('express')
const  app = express()
const user_Router  = require('./user')

const API_router = express.Router()

app.use(express.json())


app.use('/user', user_Router)


module.exports = API_router