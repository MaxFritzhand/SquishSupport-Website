import React, {Component} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png' 
import medium from '../../assets/medium.png'
import './footer.css'

class Footer extends Component {
  render() {
    return(
      <Container id="footer-container">
        <Row id="socials-row">
          <a href="https://www.facebook.com/Squish-327012817964612/"> <img className="icons "id="facebook" src={facebook} alt="Link to Squish Facebook"/> </a>   
          <a href="https://www.instagram.com/squishsupport/"> <img className="icons "id="instagram" src={instagram} alt="Link to Squish Instagram"/> </a>
          <a href="https://www.linkedin.com/company/14807212/admin/"> <img className="icons "id="linkedin" src={linkedin} alt="Link to Squish Linkedin"/> </a>
          <a href="https://medium.com/@20squish19"> <img className="icons "id="medium" src={medium} alt="Link to Squish Medium"/> </a>         
        </Row>
        <Row id="footer-row">
          <p id="footer-text-1">Copyright 2019 Squish LLC</p>
          <p id="footer-text-2">All Rights Reserved</p>
        </Row>
        <Row id="privacy-terms-row">
          <a href="#" id="footer-text-3">Privacy Policy</a>
          <a href="#" id="footer-terms">Terms of Use</a>
        </Row>
    </Container>
    )
  }
}

export default Footer