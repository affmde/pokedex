import { Card, Col, Container, Row } from "react-bootstrap"
import {Helmet} from 'react-helmet'

export const CaughtPokemons = ({myPokemons, detail}) => {

    const arr = myPokemons.sort((a,b)=>a.pokemon - b.pokemon)
    if(!myPokemons){
        return null
    }

    const images = []
    detail.forEach(pok=>{
        myPokemons.forEach(p=>{
            if(p.pokemon===pok.id){
                images.push(pok.sprites.front_default)
            }
        })
    })

    return(
        <div>
        <Helmet>
            <title>PokeThat - Caught Pokemons</title>
            <meta name="description" content="Check here all pokemons you've already get" />
        </Helmet>
        <Container>
            <Row>
                <Col>Total: {arr.length}</Col>
            </Row>
            <br/>
            <Row>
                {arr.map((pokemon, index)=>(
                    <Col key={Math.floor(Math.random()*1000000000000)} md={{span: 2, offset: 0}}>
                        <Card style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={images[index]}></Card.Img>
                            <Card.Body>
                                <Card.Title><strong>{pokemon.info.name}</strong></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    )
}