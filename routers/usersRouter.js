const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const { json } = require('express/lib/response')

const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res)=>{
    try{
        const users = await User.find({})
        res.json(users)
    }catch(error){
        console.log(error)
    }
})

usersRouter.get('/:id', async (req, res)=>{
    const id=req.params.id
    try{
    const user = await User.findById(id)
    res.json(user)
    }catch(error){
        console.log(error)
    }
})

usersRouter.post('/', async (req, res)=>{
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: passwordHash,
        pokemons: [],
        myPokemons: [],
        pokeballs: 15,
        stamina: 100,
        experience: 0,
    }
    const saveUser = new User(newUser)
    
    try{
        const response = await saveUser.save()
        res.status(201).json(response)
    }catch(error){
        console.log(error)
    }
})


module.exports=usersRouter;