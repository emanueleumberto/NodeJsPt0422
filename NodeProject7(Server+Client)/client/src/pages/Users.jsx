import React from 'react'
import { Container } from 'react-bootstrap'
import HeaderNav from '../components/HeaderNav';
import UsersTable from '../components/UsersTable';

export default function Users() {

  return (
    <>
      <HeaderNav />
      <Container className="my-5" >
          <UsersTable />
      </Container>
    </>
  )
}
