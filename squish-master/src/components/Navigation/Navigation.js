import React, { Component } from 'react'
import { getSession } from '../Account/UserFunctions'
import Logout from '../Account/Logout/Logout'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import './nav.css'

class Navigation extends Component {
  


  render() {
    return(
      <div className="wrapper" id="navigation">
        <Navbar id="squish-nav" expand="lg" fixed="top">
          
          <Container>
            <Navbar.Brand href="/" className="purple-bg" id="nav-home"> Squish </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          </Container>
  
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto purple-bg" id="nav-links">
            {getSession() ? <Nav.Link href="/profile"  >Profile</Nav.Link> : null }
            <Nav.Link href="/about"  >About</Nav.Link>
            <Nav.Link href="/team"  >Team</Nav.Link>
            <Nav.Link href="/contact"  >Contact</Nav.Link>
            {getSession() ? <Logout/> : <Nav.Link href="/account"  >Login</Nav.Link> }
          </Nav>
          </Navbar.Collapse>
  
        </Navbar>
      </div>
    )
  }
}

export default withRouter(Navigation)

