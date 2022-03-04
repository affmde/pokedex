const User = require('../models/users')
const jwt = require('jsonwebtoken')
const pokemonRouter = require('express').Router()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

pokemonRouter.post(`/`, async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const pokem = user.pokemons.concat(body)
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: pokem,
    myPokemons: user.myPokemons,
    pokeballs: user.pokeballs,
    stamina: user.stamina,
    experience: user.experience,
    }
  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser)
})

pokemonRouter.post('/deleteFav', async (req, res)=>{
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const pokem = user.pokemons.filter(pokemon=>{
    return pokemon.pokemon !== body.pokemon
  })
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: pokem,
    myPokemons: user.myPokemons,
    pokeballs: user.pokeballs,
    stamina: user.stamina,
    experience: user.experience,
    }
  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser)
})


//user catches pokemon

pokemonRouter.post(`/catchPokemon`, async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const pokem = user.myPokemons.concat(body)
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: user.pokemons,
    myPokemons: pokem,
    pokeballs: user.pokeballs,
    stamina: user.stamina,
    experience: user.experience,
    }
  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser)
})

//user throws pokeball

pokemonRouter.post(`/pokeballs`, async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const pokeballs = parseInt(user.pokeballs)-1
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: user.pokemons,
    myPokemons: user.myPokemons,
    pokeballs: pokeballs,
    stamina: user.stamina,
    experience: user.experience,
    }

  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser)
})



//user spins pokestop to get pokeballs

pokemonRouter.post(`/pokestop`, async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const pokeballs = user.pokeballs+req.body.pokeballs
  
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: user.pokemons,
    myPokemons: user.myPokemons,
    pokeballs: pokeballs,
    stamina: user.stamina,
    experience: user.experience,
    }

  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser.pokeballs)
})

pokemonRouter.post(`/stamina`, async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const stamina = req.body.type === 'spend' ? user.stamina -5 : 100
  
  const update={
    name: user.name,
    email: user.email,
    username: user.username,
    pokemons: user.pokemons,
    myPokemons: user.myPokemons,
    pokeballs: user.pokeballs,
    stamina: stamina,
    experience: user.experience,
    }

  const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
  res.json(updatedUser.stamina)
  })


  pokemonRouter.post(`/experience`, async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const user = await User.findById(decodedToken.id)
    const exp = user.experience + body.exp
    console.log('exp:', exp)
    console.log('body: ', body)
    const update={
      name: user.name,
      email: user.email,
      username: user.username,
      pokemons: user.pokemons,
      myPokemons: user.myPokemons,
      pokeballs: user.pokeballs,
      stamina: user.stamina,
      experience: exp,
      }
  
    const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
    res.json(updatedUser)
    })


    pokemonRouter.post(`/level`, async (req, res) => {
      const body = req.body
      const token = getTokenFrom(req)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    
      const user = await User.findById(decodedToken.id)
      const lev = user.level + 1
      console.log('level: ', lev)
      const update={
        name: user.name,
        email: user.email,
        username: user.username,
        pokemons: user.pokemons,
        myPokemons: user.myPokemons,
        pokeballs: user.pokeballs,
        stamina: user.stamina,
        experience: user.experience,
        }
    
      const updatedUser = await User.findByIdAndUpdate(user._id, update, {new: true})
      res.json(updatedUser)
      })

module.exports = pokemonRouter