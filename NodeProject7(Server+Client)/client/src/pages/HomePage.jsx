import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import HeaderNav from '../components/HeaderNav'
import { useNavigate, useParams } from 'react-router-dom';

export default function HomePage() {

  let { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TOKEN", token)
    if(token) {
      localStorage.setItem('userLogin', token);
      navigate("/");
    }
  }, [])
  

  return (
    <>
      <HeaderNav />
      <Container className="my-5 w-25" >
          <h1>HomePage</h1>
      </Container>
    </>
  )
}
