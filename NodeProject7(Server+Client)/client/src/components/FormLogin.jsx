import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {

    const [User, setUser] = useState({});
    const [Error, setError] = useState(null);
    const navigate = useNavigate();

    const formHandler = (event) => {
        //console.log(event.target.name, event.target.value)
        setUser({
            ...User,
            [event.target.name] : event.target.value
        })
    }

    const formSubmittedHandler = () => {
        //console.log(User);
        axios.post('http://localhost:3001/login', User)
                .then((response) => { 
                    localStorage.setItem('userLogin', response.data);
                    navigate("/");
                })
                .catch(error => { 
                    setError(error.response.data)
                    //console.error(error.response.data) 
                })
    }

    const logWithFacebook = () => {
        axios.get('http://localhost:3001/fblogin', User)
        .then((response) => { 
            //localStorage.setItem('userLogin', response.data);
            console.log(response)
        })
        .catch(error => { 
            setError(error.response.data)
            //console.error(error.response.data) 
        })
    }

  return (
    <>
        <h1>Login</h1>
        <Form className="my-3">
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" name="email" placeholder="Enter email"  onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" name="password" placeholder="Enter password"  onChange={formHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formButton">
                <Button variant="dark" onClick={formSubmittedHandler}>Login</Button>
            </Form.Group>
            { Error ? <Alert key={'danger'} variant={'danger'}>
                {Error.error}
            </Alert> : ''}
            <Form.Group className="mb-3" controlId="formButton">
                <Button variant="dark" onClick={logWithFacebook}>Facebook Login</Button>
            </Form.Group>
        </Form>
    </>
  )
}
