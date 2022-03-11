import React from 'react'
import { Container, Col, Row} from 'react-bootstrap'
import './homeComponent.css'
import {Helmet} from 'react-helmet'

export const HomeComponent = ({user, fav, myPokemons, pokeballs}) => {

    if(!user){
        return (
            <div>
            <Helmet>
                <title>PokeThat</title>
                <meta name="description" content="Homepage. Register and login to enter the PokeThat app" />
            </Helmet>

            <Container fluid id="homepage-offline">
              <br/><br/><br/>
              <Col md={{ span: 5, offset: 1 }}><h1 id="home-title">Poke That</h1></Col>  
              <br/><br/><br/>
              <Col md={{ span: 3, offset: 1 }}><h5 id="home-subtitle">Let's fetch them all!</h5></Col>  
            </Container>
            </div>
        )
    }

    return (
        <div>
        <Helmet>
            <title>PokeThat</title>
            <meta name="description" content="homepage to the website. check your scores and decided what to do next" />
        </Helmet>

        <Container fluid id="homepage-online">
            <br/><br/><br/><br/>
            <Row>
                <Col className="onlineInfo"><h1>Welcome {user.data.name}</h1></Col>
            </Row>
            <br/>
            <Row>
                <Col><h3>Stats</h3></Col>
            </Row>
            <Row className="onlineInfo">
                <Col md={{ span: 1, offset: 0 }}>My Pokemons</Col>
                <Col md={{ span: 1, offset: 1 }}>Pokeballs</Col>
                <Col md={{ span: 1, offset: 1 }}>My favorite Pokemons</Col>
            </Row>
            <Row>
            <Col md={{ span: 1, offset: 0 }}>{myPokemons.length}</Col>
                <Col md={{ span: 1, offset: 1 }}>{pokeballs}</Col>
                <Col md={{ span: 1, offset: 1 }}>{fav ? fav.length : "..."}</Col>
            </Row>
        </Container>
        </div>
    )
}