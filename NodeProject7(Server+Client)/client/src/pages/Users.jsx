import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function Users() {

  const [User, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let userLogin = localStorage.getItem("userLogin");
    if(!userLogin) {
      navigate("/login");
    } else {
      //console.log(userLogin);
      var userLoginDecoded = jwt_decode(userLogin);
      //console.log(userLoginDecoded);
      setUser(userLoginDecoded);
    }
  }, [])


  return (
    <Container className="my-5 w-25" >
        <h1>UsersPage</h1>
        <h2>Solo per persone Loggate!!</h2>
        {User ? <h3>Ciao {User.name} {User.lastname}</h3> : ''}
    </Container>
  )
}
