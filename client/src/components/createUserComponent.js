import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import Axios from 'axios'


export const CreateUserComponent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
        name, email, username, password
    }
    const response = await Axios.post("http://localhost:3001/users", newUser)
    console.log(response)
    return response
}
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" onChange={e=>setName(e.target.value)}></Form.Control>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}></Form.Control>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)}></Form.Control>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create User
            </Button>
        </Form>
    )
}