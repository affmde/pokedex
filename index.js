const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');
const pokemonRouter = require('./routers/pokemonRouter')
require('dotenv').config()
const app = express()

const mongo_uri = process.env.MONGODB_URI
mongoose.connect(mongo_uri).then(res=>{
    console.log('Connected to MongoDB')
}).catch(error =>{
    console.log(error)
})


app.use(cors())
app.use(express.json())
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/pokemon', pokemonRouter)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
