import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Card, Col, Image, Row } from 'react-bootstrap';

export default function CardProfile() {

const [User, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let userLogin = localStorage.getItem("userLogin");
    if(!userLogin) {
      navigate("/login");
    } else {
      var userLoginDecoded = jwt_decode(userLogin);
      setUser(userLoginDecoded);
    }
  }, [])


  return (
    <>
    <h1>Profile</h1>
    { User ? 
    <Row xs={1} md={12} className="mt-5">
        <Col>
        <Card>
        <Row>
            <Col md={4} className="m-3 d-flex">
                <Image className="w-100 align-self-center" roundedCircle src={User.img} />
            </Col>
            <Col md={7}>
            <Card.Body>
              <Card.Title>{User.name + " " + User.lastname}</Card.Title>
              <Card.Text>
                Email: {User.email}
              </Card.Text>
            </Card.Body>
          </Col> 
        </Row>
        </Card>
        </Col>
    </Row>
     : '' }
    </>
  )
}