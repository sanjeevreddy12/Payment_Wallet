const express = require('express')
const mongoose  = require("mongoose")
const app = express()
const accounts_Router = express.Router()
const {authMiddleware} = require('../middleware')
const { User } = require('../db')

app.use(authMiddleware)

accounts_Router.get('/balance', (req, res) => {
    const userId = req.userId
    // console.log('userId' + userId)
    User.findById(userId)
    .then((data) => {
        if(data){
            // console.log(data);
            res.json({msg : 'Balance Retrived', balance : data.balance, username : data.username})
        }
        else{
            res.json({msg : 'User dont exits'})
        }
    })
    .catch((err) => {res.json({msg : err})})
})

accounts_Router.post('/transfer', async (req, res) => {
    let session
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { amount, to } = req.body;
        // Fetch the sender's account within the transaction
        const account = await User.findOne({ _id: req.userId }).session(session);
        if (!account || account.balance < amount) {
            throw new Error("Insufficient balance or invalid account");
        }

        // Fetch the receiver's account within the transaction
        const toAccount = await User.findOne({ _id: to }).session(session);
        if (!toAccount) {
            throw new Error("Invalid receiver account");
        }

        // Prepare transaction data
        const sendData = {
            username: toAccount.username,
            number: toAccount.number,
            amount: amount,
            trans_date: new Date(),
            mode: 'Sent'
        }

        const receivedData = {
            username: account.username,
            number: account.number,
            amount: amount,
            trans_date: new Date(),
            mode: 'Received'
        }

        // Perform the transfer
        await User.updateOne({ _id: req.userId }, { $inc: { balance: -amount }, $push: { 'transactions': sendData } }).session(session);
        await User.updateOne({ _id: to }, { $inc: { 'balance': amount }, $push: { 'transactions': receivedData } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "successful"
        });
    } catch (error) {
        console.error('Transfer Error:', error);
        res.status(500).json({
            message: "failed",
            error: error.message // Send the error message in the response
        });
    } finally {
        session.endSession();
    }
});



accounts_Router.get('/transactions', (req, res) => {
    const userId = req.userId
    // console.log(userId)
    User.findOne({_id : userId})
    .then((user) =>{
        if(user){
            res.json({transactions : user.transactions})   
        }
        else{
            res.json({msg : 'User dont exists'})
        }
    })
    .catch((err) => res.json({error : err}))
})

module.exports = accounts_Router
