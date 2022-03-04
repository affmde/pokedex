import Axios  from 'axios';
import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import like from '../media/images/like.png'
import liked from '../media/images/liked.png'
import './cardComponent.css'



export const CardComponent = ({info, user, fav, setFav, desc}) => {
    const [favorite, setFavorite] = useState(false)
    
    useEffect(()=>{
        const found = fav.find(pokemon=>pokemon.pokemon===info.id)
        if(found){
            setFavorite(true)
            }
    },[favorite])



    const addFavorite = async () => {
    
    const token = user.data.token
    const config = {
        headers: { Authorization: `bearer ${token}` },
      }

    const pokem = {info: info.species, pokemon: info.id}
       await Axios.post('/pokemon', pokem , config)
       setFav(fav.concat(pokem))
    }

    const removeFavorite = async () => {
        
        const token = user.data.token
        const config = {
            headers: { Authorization: `bearer ${token}` },
          }
           
           await Axios.post('/pokemon/deleteFav', {info: info.species, pokemon: info.id}, config)
           setFav(fav.filter(f=>f.pokemon !== info.id))
        }

    if(!info){
        return <div>loading...</div>
    }
    
    return(
        <Card style={{ minWidth: '18rem', maxWidth: '18rem', margin: '10px 10px' }} className="card">
            <Card.Img variant="top" src={info.sprites.front_default}/>
            <Card.Body >
                <Card.Title>{info.species.name}</Card.Title>
                <Card.Text>
                    {desc[info.id-1]}
                </Card.Text>
            </Card.Body >
            <div className="card-body">
                {!favorite &&(<img className="imgLike" alt="like" src={like} onClick={addFavorite} ></img>)}
                {favorite && (<img className="imgLike" alt="liked" src={liked} onClick={removeFavorite} ></img>)}
            </div>
            
        </Card>
    )
}