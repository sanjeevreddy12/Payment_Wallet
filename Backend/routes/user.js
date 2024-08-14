const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {authMiddleware} = require('../middleware')
const secret_key = require('../config')
const { User } = require('../db')
const user_Router = express.Router()

app.use(express.json())


user_Router.post('/signUp', (req, res) => {

    const details = req.body
    const new_user = new User(details)
    
    new_user.save()
    .then(() =>{
        // console.log('New User Created')
        // Generating the token
        const token = jwt.sign({userId : new_user._id}, secret_key)
        // res.cookie('token', token,  { maxAge: 3600000})
        res.json({msg : 'user created', token : token})
    })
       .catch((err) =>{
        // console.log(err.message);
        res.status(411).json({msg : err.message})
    }) 
    
})


user_Router.post('/signIn' ,(req, res) => {
    const details = req.body

    User.findOne({ number: details.number, password: details.password })
        .then((user) => {
            if (user) {
                // console.log(`User ${details.username} exists`);
                const token = jwt.sign({userId : user._id}, secret_key)
                // res.cookie('token', token,  { maxAge: 3600000})
                res.json({msg : 'Signed In', jwt : token})
            } else {
                res.status(401).json({ msg: 'User does not exist' });
            }
        })
        .catch((err) => {
            // console.error(err);
            res.status(500).json({ msg: 'Error finding user', error: err.message });
        });

    
})

user_Router.post('/update', authMiddleware, (req, res) => {
    const userId = req.userId
    const details = req.body.updateData
    // console.log(userId)
    User.findByIdAndUpdate(userId, details)
    .then((resp) => {res.json({msg : "Updated"})})
    .catch((err) => res.json({msg : 'User with same number already exits', error : err}))

})

user_Router.get('/search', authMiddleware, (req, res) => {
    const  username = req.query.filter || '';
    console.log(username)
    if(username === ''){
        User.find({})
        .then((data) =>  {res.json({msg : data})})
        return
    }
    User.find({'username': username})
    .then((data) =>{  res.status(200).json({msg : data})})
    .catch((err) => console.log(err))
})

module.exports = user_Router