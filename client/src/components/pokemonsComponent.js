import React, {useState} from "react";
import { CardComponent } from "./cardComponent";
import { CardGroup } from "react-bootstrap";
import {Helmet} from 'react-helmet'


export const PokemonsComponent = ({user, fav, setFav, detail, description}) => {
    const [filter, setFilter] = useState('')
    
    if(!user || !fav || !detail){
        return <div>Loading...</div>
    }
    
    const filtered = detail.filter(pokemon=>pokemon.species.name.toLowerCase().includes(filter.toLowerCase()))
    const arr = filtered.sort((a,b)=>a.id - b.id)

    return (
        <div>
            <Helmet>
                <title>Pokemon List</title>
                <meta name="description" content="Check here all pokemons from first generation" />
            </Helmet>
            <input type="text" placeholder="filter by name" onChange={e=>setFilter(e.target.value)}></input>
            <CardGroup >
                {arr.map(pokemon => <CardComponent key={Math.floor(Math.random()*10000000000000)} info={pokemon} user={user} fav={fav} setFav={setFav} desc={description} />)}
            </CardGroup>
        </div>
    )
}