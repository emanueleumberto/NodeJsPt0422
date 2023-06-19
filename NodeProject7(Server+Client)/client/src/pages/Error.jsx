import React from 'react'
import { Container } from 'react-bootstrap'
import HeaderNav from '../components/HeaderNav'

export default function Error() {
  return (
    <>
      <HeaderNav />
      <Container className="my-5 w-25" >
          <h1>ErrorPage</h1>
      </Container>
    </>
  )
}
