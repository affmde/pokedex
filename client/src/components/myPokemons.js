import React from 'react'
import {Card, Button, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const MyPokemons = ({detail, description, user, fav, setFav}) => {
    
    if(!fav)return <div>Loading...</div>
    const arr = fav.sort((a,b)=>a.pokemon - b.pokemon)
    return(
        <div>
        <CardGroup>
        {arr.map(pokemon=>( 
            <Card style={{ minWidth: '18rem', maxWidth: '18rem', margin: '10px 10px' }} key={pokemon.pokemon}>
            <Card.Img variant="top" src={detail[pokemon.pokemon-1].sprites.front_default} />
            <Card.Body>
                <Card.Title>{pokemon.info.name}</Card.Title>
                <Card.Text>
                {description[pokemon.pokemon-1]}
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