import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SquishImage from '../assets/SquishImage.svg'
import { Link } from 'react-router-dom'
import '../App.css'
import '../seek-or-support.css'

export default function SeekOrSupport() {
  return(
    <div className="wrapper seek-or-support-bg">

      <center>
      <Container className="seek-support-container">
        <Row className="choice-row">

          <Col className="choice-col">
            <h1>Seek Support</h1>
            <p>Need someone to talk to but not sure where to go? Seek and receive direct Squish support today. Our network provides comprehensive diversity in helping you.</p>
            <Link to="/onboarding/specialties"> 
              <button className="choice-button">Seek</button>
            </Link>
          </Col>

          <Col className="choice-col" id="image-column">   
            <img src={SquishImage} id="squish-image" alt="Squish Logo"/>
          </Col>
          <Col className="choice-col">
            <h1>Provide Support</h1>
            <p>Use your past experience to connect with individuals enduring similar issues. Complete our three step signup process to become a certified Squisher.</p>
            <Link to="/onboarding/specialties"> 
              <button className="choice-button">Support</button>
            </Link>
          </Col>
        </Row>
        <Row className="circle-row">
            <div className="white-circle-3"></div>
            <div className="white-circle-4"></div>
        </Row>
      </Container>
      </center>

    </div>
  )
}