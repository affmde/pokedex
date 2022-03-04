const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res)=> {
    try{
    const username = req.body.username
    const password = req.body.password
    
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    if(!user || !passwordCorrect){
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    
        res.status(200).send({token, 
                            username: user.username, 
                            name: user.name, 
                            favoritePokemons: user.pokemons, 
                            myPokemons: user.myPokemons, 
                            pokeballs: user.pokeballs,
                            stamina: user.stamina,
                            experience: user.experience,
                            })
    }catch(error){
        console.log(error)
        response.status(400).end()
    }
})

module.exports = loginRouter