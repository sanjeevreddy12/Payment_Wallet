const express = require('express')
const user_Router = require('./routes/user')
const accounts_Router = require('./routes/accounts')
const { authMiddleware } = require('./middleware')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors({
    origin : 'http://localhost:5173'
}))

app.get('/send', authMiddleware, (req, res) => {

    res.json({msg : 'Testing, Token is valid'})
})

app.use('/user', user_Router)

app.use('/account', authMiddleware, accounts_Router)


app.listen(3000)
