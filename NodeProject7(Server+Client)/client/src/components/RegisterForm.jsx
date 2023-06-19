import React, { createRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {

    const [User, setUser] = useState({});
    const navigate = useNavigate();
    const img = createRef();

    const formHandler = (event) => {
        //console.log(event.target.name, event.target.value)
        setUser({
            ...User,
            [event.target.name] : event.target.value
        })
    }

    const formSubmittedHandler = () => {
        //console.log(User);
        //console.log(img.current.files[0]); // file che sto importando da form
        let data = new FormData();
        data.append('name', User.name);
        data.append('lastname', User.lastname);
        data.append('city', User.city);
        data.append('email', User.email);
        data.append('password', User.password);
        data.append('uploadFile', img.current.files[0]);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        //console.log(data)
        
        axios.post('http://localhost:3001/api/register', data, config)
                .then((response) => { navigate("/login");})
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
                <Form.Control type="file" name="img" placeholder="Enter Image" ref={img} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formButton">
                <Button variant="dark" onClick={formSubmittedHandler}>Submit</Button>
            </Form.Group>
        </Form>
    </>
  )
}
