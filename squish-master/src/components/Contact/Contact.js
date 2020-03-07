import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Footer from '../Footer/Footer'
import Swal from 'sweetalert2'
import { contactUs } from '../Account/UserFunctions'
import location_icon from './assets/location-icon.jpg'
import './contact.css'

export default class Contact extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      message: "",
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const info = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    contactUs(info).then(res => {
      if (res) {
        this.setState({
          name: '',
          email: "",
          message: "",
        })
        Swal.fire({
          title: "Your Message has been sent.",
          text: "We'll get back to you as soon as possible",
          type: 'success',
          timer: 1500
        })
      }
    })
  }

  // componentDidMount(){
  //   const navHome = document.getElementById("nav-home")
  //   const navLinks = document.getElementById("nav-links")
  //   navHome.classList.remove("white-bg")
  //   navLinks.classList.remove("purple-bg")
  //   navLinks.classList.add("modified")
  // }

  render() {
    const { name, email, message } = this.state
    return(
      <div className="wrapper">
        <Container className="contact-page-container">
          <Row>
            <Col xs={12} sm={6} id="mobile-top-row">
              <Row id="contact-left-header">Questions?</Row>
              <Row id="contact-left-text">Tell us what's on your mind!</Row>
              <Row id="contact-left-subtext">On here you can send us a message regarding anything Squish related (or just to tell us your story). We want an open dialogue with YOU and will respond back to each and every message. We aren’t just changing the way we communicate about mental health, we are Squishing the Stigma behind it. #SQUISHtheStigma</Row>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group id="contact-form-container">
                <Row id="contact-form-header">Let's Get In Touch</Row>
                <Row id="contact-form-input-row">
                  <Col xs={12}>
                    <input className="form-control contact-form-input" type="text" name="name" value={name} onChange={this.onChange} placeholder="Please Enter Your Full Name" required/>
                  </Col>
                  <Col xs={12}>
                    <input className="form-control contact-form-input" type="email" name="email" value={email} onChange={this.onChange} placeholder="Please Enter Your Email" required/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <textarea className="form-control" id="contact-form-message" name="message" value={message} onChange={this.onChange} rows="6" cols="48" placeholder="Enter your message here" required/>
                  </Col>
                </Row>
                <button type="submit" className="form-group" id="contact-form-button" onClick={this.onSubmit}> Send Message</button>
              </Form.Group>
            </Col>
          </Row>
          <Container>
          <Row id="contact-page-location">
            <Col xs={12} id="footer-col">
              <div id="footer-col-items">
                <img src={location_icon} alt="gps-icon" id="gps-icon"/>
                <p>30 E. Corry Street Cincinatti, OH 45219</p>
              </div>
            </Col>
          </Row>
          </Container>
          <Footer/>
        </Container>
      </div>
    )
  }
}