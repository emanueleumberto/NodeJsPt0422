import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HeaderNav() {
  return (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">React-NodeJS-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Navbar.Collapse>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
            </Navbar.Collapse>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
