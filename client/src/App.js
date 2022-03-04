import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginComponent } from './components/loginComponent';
import { NavbarComponent } from './components/navbarComponent';
import {PokemonsComponent} from './components/pokemonsComponent'
import {useState, useEffect} from 'react'
import Axios from 'axios';
import { CreateUserComponent } from './components/createUserComponent';
import { HomeComponent } from './components/homeComponent';
import { MyPokemons } from './components/myPokemons'
import { PokemonInfoComponent} from './components/pokemonInfoComponent'
import { MessageComponent } from './components/messageComponent';
import { WildComponent } from './components/the-wild/wildComponent';
import { CaughtPokemons } from './components/the-wild/caughtPokemons';

const App = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [favPokemons, setFavPokemons] = useState(null)
  const handleShow = () => setShow(true);
  const [detail, setDetail] = useState([])
  const [description, setDescription] = useState([])
  const [message, setMessage] = useState('')
  const [err, setErr] = useState(false)
  const [myPokemons, setMyPokemons] = useState([])
  const [pokeballs, setPokeballs] = useState(15)
  const [stamina, setStamina] = useState(0)
  const [experience, setExperience] = useState(0)
  

  const handleClose = () =>{
    setShow(false);
    setErr(false)
  }

  
 
    useEffect(()=>{
      const arr = []
      const description = []

      function fetchKantoPokemon(){
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
         .then(response => response.json())
         .then(function(allpokemon){
         allpokemon.results.forEach(function(pokemon){
           fetchPokemonData(pokemon); 
           fetchPokemonDescription(pokemon)
         })
        })
       }

       function fetchPokemonData(pokemon){
        let url = pokemon.url
          fetch(url)
          .then(response => response.json())
          .then(function(pokeData){
          arr.push(pokeData)
          })
        }

        function fetchPokemonDescription(pokemon){
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
          .then(response=> response.json())
          .then(function(pokemonData){
            description.push(pokemonData.flavor_text_entries[0].flavor_text)
          })
        }

        fetchKantoPokemon()
        setDetail(arr)
        setDescription(description)

    },[])


    const handleLogin = async (e) => {
      try{
        e.preventDefault()
        const user = await Axios.post('/login', {username, password})
        setUser(user)
        window.localStorage.setItem('pokeuser', user.data.token)
        setUsername('')
        setPassword('')
        setFavPokemons(user.data.favoritePokemons)
        setMyPokemons(user.data.myPokemons)
        setPokeballs(user.data.pokeballs)
        setStamina(user.data.stamina)
        setExperience(user.data.experience)
        handleClose()
        setMessage({type:'success', message:'Logged in successfully'})
        setErr(false)
        setTimeout(()=>{
          setMessage("")
        }, 3000)
      }catch(error){
        console.log(error)
        setMessage({type: 'error', message: 'Wrong username or password'})
        setTimeout(()=>{
          setMessage("")
        }, 3000)
        setErr(true)
      }
    }

    const handleLogout = () => {
      setUser(null)
      
      window.localStorage.removeItem('pokeuser')
      setMessage({type:'success', message:'Logged out successfully'})
      setTimeout(()=>{
        setMessage("")
      }, 2000)
    }
    
    
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent handleShow={handleShow} user={user} handleLogout={handleLogout} />
      <MessageComponent message={message} />
      {!user &&(<LoginComponent err={err} show={show} handleClose={handleClose} handleShow={handleShow} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />)}
        <Routes>
          <Route path="*" element={<HomeComponent pokeballs={pokeballs} user={user} fav={favPokemons} myPokemons={myPokemons} />}></Route>
          {user && (<Route path="/pokemons" element={<PokemonsComponent user={user} setFav={setFavPokemons} fav={favPokemons} detail={detail} description={description} />}/>)}
          {!user &&(<Route path="newUser" element={<CreateUserComponent />}/>)}
          {user && (<Route path="/myPokemons" element={<MyPokemons setFav={(setFavPokemons)}  fav={favPokemons} detail={detail} description={description} user={user} />}></Route>)}
          {user && (<Route path="/wild" element={<WildComponent experience={experience} setExperience={setExperience} stamina={stamina} setStamina={setStamina} pokeballs={pokeballs} setPokeballs={setPokeballs} setMessage={setMessage} setMyPokemons={setMyPokemons} myPokemons={myPokemons} user={user} pokemons={detail}/>}></Route>)}
          {user && (<Route path="/pokemons/:id" element={<PokemonInfoComponent />} ></Route>)}
          {(user && myPokemons) && (<Route path="/caughtPokemons" element={<CaughtPokemons detail={detail} myPokemons={myPokemons}/>}></Route>)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
