import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import './loginComponent.css'

export const LoginComponent = ({err, show, handleClose, handleShow, setUsername, setPassword, handleLogin}) => {
  
    if(!show)return null

    return(
        <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        {err && <Modal.Body id="login-error">Wrong username or password</Modal.Body>}
        <Modal.Body><input type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}/></Modal.Body>
        <Modal.Body><input type="password" placeholder='Password' onChange={e=>setPassword(e.target.value)}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}