import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Container } from 'react-bootstrap'
import HeaderNav from '../components/HeaderNav'

export default function Register() {
  return (
    <>
      <HeaderNav />
      <Container className="my-5 w-25" >
          <RegisterForm />
      </Container>
    </>
  )
}
