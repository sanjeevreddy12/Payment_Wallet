const mongoose = require('mongoose')

mongoose.connect('#')  //add your mongoDB cluster url
.then((res) =>{
    console.log(res+'connected to database');
})
.catch((err) =>{
    console.error('Connection Error');
})


const user_schema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    number : {
        type : Number,
        unique: true 
    },
    balance : {
        type : Number,
        default : 10000
    },
    transactions : [
        {
            username : String,
            number : Number,
            amount : Number,
            mode : String,
            trans_date : Date
        }
    ],
    friends : [{
        username : String
    }]
})

const User = mongoose.model('User', user_schema)


module.exports = {User}