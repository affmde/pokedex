import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import {Spinner, Container, Row, Col, Image} from 'react-bootstrap'
import './pokemonInfoComponent.css'

export const PokemonInfoComponent = () => {
    const id = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [description, setDescription] = useState(null)

    useEffect(()=>{
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${id.id}`).then(res=>{
            setPokemon(res.data)
        })

        Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id.id}`).then(res=>{
            setDescription(res.data.flavor_text_entries[0].flavor_text)
        })
    }, [])

    if(!pokemon)return <Spinner animation="border" />
    return (
        <Container fluid id="poke-info-container">
            <Row className="poke-detail-row">
                <Col><h2>{pokemon.name}</h2></Col>
            </Row>
            <Row className="poke-detail-row" span={2}>
                <Col md={{ span: 2, offset: 0 }}><Image thumbnail fluid alt="pic" src={pokemon.sprites.front_default} id="detail-pic"></Image></Col>
                <Col md={{ span: 7, offset: 0 }} id="detail-description" >{description} </Col>
                <Col md={{ span: 2, offset: 0 }}><strong>Height:</strong> {pokemon.height} <br/><br/> <strong>Wight:</strong> {pokemon.weight}</Col>
            </Row>
            <br/>
            <br/>
            <Row className="poke-detail-row">
                <Col><h5>Types</h5></Col>
            </Row>
            <Row className="poke-detail-row">
                {pokemon.types.map(t=><Col key={t.type.name}>{t.type.name}</Col>)}
            </Row>
            <Row className="poke-detail-row">
                <Col><h5>Abilities</h5></Col>
            </Row>
            <Row className="poke-detail-row">
                {pokemon.abilities.map(skill=><Col key={skill.ability.name}>{skill.ability.name}</Col>)}
            </Row>
            <Row className="poke-detail-row">
                <Col><h5>Moves</h5></Col>
            </Row>
            <Row className="poke-detail-row">
                {pokemon.moves.map(skill=><Col sm={2}  key={skill.move.name}>{skill.move.name}</Col>)}
            </Row>
            
        </Container>
    )
}