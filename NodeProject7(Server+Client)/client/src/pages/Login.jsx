import React from 'react'
import FormLogin from '../components/FormLogin'
import { Container } from 'react-bootstrap'
import HeaderNav from '../components/HeaderNav'

export default function Login() {
  return (
    <>
      <HeaderNav />
      <Container className="my-5 w-25" >
          <FormLogin />
      </Container>
    </>
  )
}
