import React from 'react'
import {Card, Button, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'

export const MyPokemons = ({detail, description, user, fav, setFav}) => {
    
    if(!fav)return <div>Loading...</div>
    const arr = fav.sort((a,b)=>a.pokemon - b.pokemon)

    const images = []
    detail.forEach(pok=>{
        fav.forEach(p=>{
            if(p.pokemon===pok.id){
                images.push(pok.sprites.front_default)
            }
        })
    })
    const descr = []
    description.forEach(pok=>{
        fav.forEach(p=>{
            if(p.pokemon===pok.id){
                descr.push(pok.description)
            }
        })
    })
    
    return(
        <div>
            <Helmet>
                <title>PokeThat - Favorite Pokemons</title>
                <meta name="description" content="Check here all your favorite pokemons, and get access to the description of each one" />
            </Helmet>
        <CardGroup>
        {arr.map((pokemon, index)=>( 
            <Card style={{ minWidth: '18rem', maxWidth: '18rem', margin: '10px 10px' }} key={pokemon.pokemon}>
            <Card.Img variant="top" src={images[index]} />
            <Card.Body>
                <Card.Title>{pokemon.info.name}</Card.Title>
                <Card.Text>
                {descr[index]}
                </Card.Text>
            </Card.Body>
            <div className="card-body">
                <Link to={`/pokemons/${pokemon.info.name}`}><Button variant="primary">Pokemon details</Button></Link>
            </div>
            
        </Card>
        ))}
        </CardGroup>
        </div>
    )
}