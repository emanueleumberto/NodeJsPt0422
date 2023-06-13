import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Container } from 'react-bootstrap'

export default function Register() {
  return (
    <Container className="my-5 w-25" >
        <RegisterForm />
    </Container>
  )
}
