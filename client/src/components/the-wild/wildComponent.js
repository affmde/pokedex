import { Button, Card, Container, Col, Row, ProgressBar } from "react-bootstrap"
import { useState, useEffect } from "react"
import Axios from 'axios'
import './wildComponent.css'
import pokeball from '../../media/images/pokeball.png'


export const WildComponent = ({experience, setExperience, stamina, setStamina, pokeballs, setPokeballs, setMessage, setMyPokemons, myPokemons, user, pokemons}) => {
    const [pokemon, setPokemon] = useState(null)
    const [attempts, setAttempts] = useState(0)
    const [pokestop, setPokestop] = useState(true)
    const [showStamina, setShowStamina] = useState(true)
    const [level, setLevel] = useState(0)
    
    
    useEffect(()=>{
        if(attempts >2){
            setAttempts(0)
            setPokemon(null)
        }

        /*if(experience >=10000){
            const reset = experience-10000
            setExperience(reset)
            getLevel()
            const send = reset-10000
            getExperience(send)
        }*/

        const lvl = Math.floor(experience/10000)+1
        console.log('lvl' , lvl)
        setLevel(lvl)

    
    },[attempts, pokemon, experience, level])

    

    let strength;
    const strengthValues = []
        if(pokemon){
            pokemon.stats.forEach(pok=>strengthValues.push(pok.base_stat))
            const sum = strengthValues.reduce((a,b)=>a+b)
            strength= Math.floor(sum/strengthValues.length)
        }
    

    
    const handleWildPokemon = async ()=>{
        await getExperience(150)
        const num = Math.floor(Math.random()*pokemons.length)
        const catchable = Math.floor(Math.random()*100)
        spendStamina()
        if(catchable<30){
            await Axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then(res=>{
            setPokemon(res.data)
            setMessage({type: 'success', message: 'You found a pokemon!'})
            setTimeout(()=>{
                setMessage('')
            }, 3000)
            })
        }else{
            setMessage({type: 'error', message: 'You didnt find any pokemon! Try again!'})
            setTimeout(()=>{
                setMessage('')
            }, 3000)
            setPokemon(null)
        }
        
    }

    const throwPokeball = async ()=>{
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
    
        const pokem = {user}
           await Axios.post('http://localhost:3001/pokemon/pokeballs', pokem , config)
           setPokeballs(pokeballs-1)
        }

    const getPokeballs = async () =>{
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
        setPokestop(false)
        setTimeout(()=>{
            setPokestop(true)
        }, 300000)
        const num = Math.floor(Math.random()*10)
        setPokeballs(pokeballs+num)
        const req = {pokeballs: num}
           await Axios.post('http://localhost:3001/pokemon/pokestop', req , config)
    }

    const spendStamina = async () => {
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
    
        
        setStamina(stamina-5)
        const req = {type: 'spend'}
        await Axios.post('http://localhost:3001/pokemon/stamina', req , config)
    }

    const getExperience = async (exper) => {
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
    
        
        setExperience(experience + exper)
        const req = {exp: exper}
        await Axios.post('http://localhost:3001/pokemon/experience', req , config)
        
    }


    const getStamina = async () => {
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }

        setStamina(100)
        setShowStamina(false)
        setInterval(()=>{
            setShowStamina(true)
        },600000)
        const req = {type: 'get'}
        await Axios.post('http://localhost:3001/pokemon/stamina', req , config)
    }
    

    const handleCatchPokemon = async () => {
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
    
        const pokem = {info: pokemon.species, pokemon: pokemon.id}
           await Axios.post('http://localhost:3001/pokemon/catchPokemon', pokem , config)
           setMyPokemons(myPokemons.concat(pokem))
        }

    const catchPokemon = async ()=> {
        if(pokeballs<= 0){
            setMessage({type: 'error', message: `You have no more Pokeballs!`})
            setTimeout(()=>{
                setMessage('')
            }, 2000)
            setPokemon(null)
            return
        }

        let caught
        const rand = Math.floor(Math.random()*100)
        await throwPokeball()
        if(strength >90){
            caught= rand<5 ? "true" : "false"
                setAttempts(attempts + 1)
        }else if(strength >80){
                caught = rand<9 ? "true" : "false"
                setAttempts(attempts + 1)
        }else if(strength >73){
            caught = rand<18 ? "true" : "false"
            setAttempts(attempts + 1)
        }else if(strength >65){
            caught = rand<30 ? "true" : "false"
            setAttempts(attempts + 1)
        }else if(strength >50){
            caught = rand<45 ? "true" : "false"
            setAttempts(attempts + 1)
        }else if(strength >40){
            caught = rand<60 ? "true" : "false"
            setAttempts(attempts + 1)
        }else{
            caught = rand<80 ? "true" : "false"
            setAttempts(attempts + 1) 
        }


        if(caught === 'true'){
            try{
                handleCatchPokemon()
                setMessage({type: 'success', message: `${pokemon.species.name} caught!`})
                setTimeout(()=>{
                    setMessage('')
                }, 2000)
                setAttempts(0)
                setPokemon(null)
                await getExperience(300)
            }catch(error){
                console.log(error)
                setMessage({type: 'error', message: `Something wrong has happened!`})
                setTimeout(()=>{
                    setMessage('')
                }, 2000)
                setAttempts(0)
                await getExperience(10)
            }
        }else{
            if(attempts >= 2){
                setMessage({type: 'error', message: `${pokemon.species.name} ran way!`})
                setTimeout(()=>{
                    setMessage('')
                }, 2000)
                setAttempts(attempts + 1)
                await getExperience(10)
            }else{
                setMessage({type: 'error', message: `You missed!`})
                    setTimeout(()=>{
                setMessage('')
                }, 2000)
                setAttempts(attempts + 1)
                await getExperience(10)
            }
            
        }
    }

    const now= Math.floor(((experience - ((level-1)*10000))/ (10000))*100)
    console.log(now)
    return(
        <div id="wild-container">
        <Container>
            <Row>
                <Col>Stats</Col>
                <Col id="level" md={{ span: 2, offset: 9 }}>Level {level}</Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 10}}><ProgressBar striped variant="info" now={now} label={`${now}%`} /></Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 0}}>Pokeballs: {pokeballs}</Col>
                <Col md={{span: 2, offset: 1}}>Stamina: {stamina} </Col>
            </Row>
            <Row>
                <Col md={{span: 2, offset: 0}}>{stamina>0 ? <Button onClick={handleWildPokemon}>Search Pokemon</Button> : 'You need more Stamina'}</Col>
                {pokestop && <Col md={{span: 2, offset: 1}}><Button onClick={getPokeballs}>Get pokeballs</Button></Col>}
                { showStamina && <Col md={{span: 2, offset: 1}}><Button onClick={getStamina}>Get Stamina</Button></Col>}
            </Row>
            <Row>
            <Col md={{ span: 6, offset: 0 }}>
            {pokemon && (<Card style={{maxWidth: '18rem', margin: '10px 10px' }} className="card">
                <Card.Img variant="top" src={pokemon.sprites.front_default}/>
                <Card.Body >
                    <Card.Title>{pokemon.species.name}</Card.Title>
                </Card.Body >
                <Card.Text className="card-body">
                    Stats
                    <Row>
                        {pokemon.stats.map(s=><Col key={s.stat.name} md={{ span: 5, offset: 0 }}><strong>{s.stat.name}</strong> {s.base_stat}</Col>)}
                    </Row>
                    <Row md={12}>
                        <Col md={{ span: 6, offset: 0 }}><Card.Text id="strength"><strong>Strength:</strong> {strength}</Card.Text></Col>
                        <Col md={{ span: 1, offset: 3 }} onClick={catchPokemon}><img alt="pokeball" src={pokeball} id="pokeball"></img></Col>
                    </Row>
                </Card.Text>
            </Card>)}
            </Col>
            </Row>
        </Container>
        </div>
    )
}