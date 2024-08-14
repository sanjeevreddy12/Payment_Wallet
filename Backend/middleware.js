const express = require('express')
const app = express()
const {User} = require('./db')
const jwt = require('jsonwebtoken')
const secret_key = require('./config')
var cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())


function authMiddleware(req, res, next){
    const header = req.headers.authorization
    // const token = req.cookies?.token
    // console.log('token' + token)
    // console.log('header' + header)

    try{

        const token = header.split(' ')[1]
        // console.log(token)
        let decoded = jwt.verify(token, secret_key)
        console.log(decoded)
        req.userId = decoded.userId
        next()
    }
    catch(err){
        res.json({msg : 'Invalid Token', error : err.name})
    }
}

module.exports = {
    authMiddleware 
}