import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const CreateUserComponent = ({setMessage}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate= useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const newUser = {
            name, email, username, password
        }
        const response = await Axios.post("/users", newUser)
        setMessage({type: 'success', message: 'User created successfuly!'})
        navigate('/')
        setTimeout(()=>{
            setMessage('')
        },3000)
        return response
    }catch(error){
        console.log(error)
        setMessage({type: 'error', message: 'Something wrong happened!'})
        setTimeout(()=>{
            setMessage('')
        },3000)
    }
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