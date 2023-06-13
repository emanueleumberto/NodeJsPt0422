import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function FormLogin() {
  return (
    <>
        <h1>Login</h1>
        <Form className="my-3">
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" name="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" name="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formButton">
                <Button variant="dark" type="submit">Submit</Button>
            </Form.Group>
        </Form>
    </>
  )
}
