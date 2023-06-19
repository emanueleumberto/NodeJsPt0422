import React from 'react'
import HeaderNav from '../components/HeaderNav'
import { Container } from 'react-bootstrap'
import CardProfile from '../components/CardProfile'

export default function Profile() {
  return (
    <>
      <HeaderNav />
      <Container className="my-5 w-25" >
          <CardProfile />
      </Container>
    </>
  )
}
