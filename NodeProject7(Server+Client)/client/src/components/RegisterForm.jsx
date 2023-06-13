import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';

export default function RegisterForm() {

    const [User, setUser] = useState({});

    const formHandler = (event) => {
        //console.log(event.target.name, event.target.value)
        setUser({
            ...User,
            [event.target.name] : event.target.value
        })
    }

    const formSubmittedHandler = () => {
        //console.log(User);
        axios.post('http://localhost:3001/register', User)
                .then((response) => { console.log(response)})
                .catch(error => { console.error(error) })
    }


  return (
    <>
        <h1>Register</h1>
        <Form className="my-3">
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" name="name" placeholder="Enter name" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastname">
                <Form.Control type="text" name="lastname" placeholder="Enter lastname" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
                <Form.Control type="text" name="city" placeholder="Enter city" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" name="password" placeholder="Enter password" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
                <Form.Control type="file" name="img" placeholder="Enter Image" onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formButton">
                <Button variant="dark" onClick={formSubmittedHandler}>Submit</Button>
            </Form.Group>
        </Form>
    </>
  )
}
