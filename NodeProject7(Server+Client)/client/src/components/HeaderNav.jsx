import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function HeaderNav() {

  const [User, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let userLogin = localStorage.getItem("userLogin");
    if(userLogin) {
      var userLoginDecoded = jwt_decode(userLogin);
      setUser(userLoginDecoded);
    }
  }, [])

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userLogin");
    navigate("/login");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-NodeJS-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/users">Users</Link>
          </Nav>
          <Nav>
            { !User ? 
                <><Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/register">Register</Link>
                </>
              : <>
              
                  <Link className="nav-link" to="/profile">Hi {User.name + ' ' + User.lastname}</Link>
                  <Link className="nav-link" onClick={logout}>Logout</Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


/* http://graph.facebook.com/1689614800/picture?type=square */