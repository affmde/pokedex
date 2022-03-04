const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    pokemons: [
        {
          type: Object,
          ref: 'Pokemon'
        }
      ],
    myPokemons: [
        {
            type: Object,
            ref: 'Pokemon'
          }
    ],
    pokeballs: Number,
    stamina: Number,
    experience: Number,
})

const User = mongoose.model('Users', usersSchema)
module.exports = User