import React from 'react';
import { Container, Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const NavbarComponent = ({handleShow, user, handleLogout}) => {
    const navigate = useNavigate()
    const logout = () => {
        handleLogout()
        navigate('/')
    }
    return(
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light" >
            <Container>
                <Navbar.Brand>PokeThat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        {user && (<LinkContainer to="/pokemons"><Nav.Link>Pokemon List</Nav.Link></LinkContainer>)} 
                        {user && (<LinkContainer to="/myPokemons"><Nav.Link>My favorite pokemons</Nav.Link></LinkContainer>)}
                        {user && (<LinkContainer to="/caughtPokemons"><Nav.Link>Caught Pokemons</Nav.Link></LinkContainer>)}
                        {user && (<LinkContainer to="/wild"><Nav.Link>The Wild</Nav.Link></LinkContainer>)}
                        {!user && <LinkContainer to="newUser"><Nav.Link>Sign Up</Nav.Link></LinkContainer>}
                        {!user ? <Nav.Link onClick={handleShow}>Login</Nav.Link> : <Nav.Link onClick={logout}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}