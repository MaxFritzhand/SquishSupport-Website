import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { preRegister } from '../Account/UserFunctions'
import community from './assets/community.svg'
import world from './assets/world.svg'
import helping_hand from './assets/helping hand.png'
import advocate from './assets/advocate.svg'
import merch from './assets/merch.svg'
import './landing.css'


class Landing extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      first_name: null,
      last_name: null,
      email: null,
      seeker: false,
      supporter: false,
      ambassador: false,
      errors: [],
      finished: false,
      visited: null
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleSeeker = () => {
    this.setState(prevState => ({
      seeker: !prevState.seeker
    }))
  }

  toggleSupporter = () => {
    this.setState(prevState => ({
      supporter: !prevState.supporter
    }))
  }

  toggleAmbassador = () => {
    this.setState(prevState => ({
      ambassador: !prevState.ambassador
    }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { seeker, supporter, ambassador } = this.state 
    if ( seeker === false && supporter === false && ambassador === false) {
      this.setState({
        errors: "Please Choose At Least One Account Type"
      })
    } else {
      preRegister(this.state).then(() => {
        this.setState({
          finished: true
        })
        Swal.fire({
          title: "You've Pre-Registered with Squish!",
          text: "We'll be following up with you shortly with more info.",
          type: 'success',
          timer: 4000
        })
      })
    }
  }

  showModal = e => {
    this.setState({
      show: true
    })
  }

  hideModal = e => {
    this.setState({
      show: false
    })
  }

  componentDidMount() {
    localStorage.setItem('hasVisited', true)
  }

  render() {
    const { show, first_name, last_name, email, seeker, supporter, ambassador, errors, finished } = this.state
    if (finished) {
      return <Redirect to='/'/>
    }
    return(
      <div className="wrapper">

        <Modal show={show} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>
              Pre-Registration
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Group>
                  <Row>
                    <Col xs={6}>
                      <Form.Control type="text" name="first_name" value={first_name} onChange={this.onChange} placeholder="First Name" required/>
                    </Col>
                    <Col xs={6}>
                      <Form.Control type="text" name="last_name" value={last_name} onChange={this.onChange} placeholder="Last Name" required/>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col xs={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name="email" value={email} onChange={this.onChange} placeholder="Enter Email" required/>
                        <Form.Text className="text-muted">We'll never share your email with anybody.</Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formBasicCheckBox">
                  <Row>
                    <Col xs={12}>
                      {errors.length === 0 ? null : (<div className="landing-page-errors"> {errors} </div>)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form.Check type="checkbox" name="seeker" onChange={this.toggleSeeker} checked={seeker} label="Seeker: (Seek Help From Supporters)"/>             
                        {/* <div className="account-type-description">Seek Help From Supporters</div> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form.Check type="checkbox" name="supporter" onChange={this.toggleSupporter} checked={supporter} label="Supporter: (Support Individuals Seeking Help)"/>
                      {/* <div className="account-type-description">Support individuals seeking help</div> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form.Check type="checkbox" name="ambassador" onChange={this.toggleAmbassador} checked={ambassador} label="Ambassador: (Promote Mental Health Awareness)"/>
                      {/* <div className="account-type-description">Promote Mental Health Awareness</div> */}
                    </Col> 
                  </Row>
                </Form.Group>
                <center><Button type="submit" className="btn btn-primary">Submit</Button></center>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        <Container className="landing-section-1">
          <Row>
            <Col xs={12}>
              <center>
                <div id="section-1-text">
                  <h1>Your Absolute <br/> Mental Health Space</h1>
                  <p id="section-1-subtext">A mental healthcare startup focusing on the congitive well being of others. Striving to make a difference in the mental health community one Squisher at a time.</p>
                  <Link to="/"><button type="button" className="btn btn-outline-light" id="landing-section-1-button">Sign Up Today</button></Link>
                </div>
              </center>
            </Col>
          </Row>
        </Container>

        <Container id="landing-section-2">
          <Row id="landing-section-2-row-1">
            <Col xs={12}>
              <center>
                <h1 className="display-4 purple-text" id="landing-section-2-header">Be A Supporter</h1>
                <p className="purple-text" >Being a Supporter, you can change mental health by opening the dialogue. Use your experience and interests to give insight into anyone’s life. Do something that really matters. </p>
              </center>
            </Col>
           </Row>
           <Row id="landing-section-2-row-2">
            <Col xs={4}>
              <center><img src={community} alt="Community Icon" className="landing-section-2-images" /></center>
              <p className="purple-text">Be a purple-texter of your own community. </p>
            </Col>
            <Col xs={4}>
              <center><img src={world} alt="World Icon" className="landing-section-2-images" /></center>
              <p class="purple-text">Bring good to the world</p>
            </Col>
            <Col xs={4}>
              <center><img src={helping_hand} alt="Helping Hand Icon" className="landing-section-2-images" /></center>
              <p class="purple-text">Be a helping hand</p>
            </Col>
           </Row>
           <center><button type="button" className="btn btn-primary btn-lg" id="sec-2-button" onClick={this.showModal} >Subscribe to be a Supporter</button></center>
        </Container>

        <Container id="landing-section-3">
          <Row>
            <Col xs={12}>
              <center>
                <h1 class="display-4 white-text">Be an Ambassador</h1>
                <p class="white-text">Spread mental health awareness through our app </p>
              </center>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <center><img src={advocate} alt="Sharing Icon" className="landing-section-2-images"/></center>
              <p class="white-text">Advocate on Mental Health. Ultimately bringing change into the world.</p>
            </Col>
            <Col xs={4}>
              <center><img src={merch} alt="Squish Logo Icon Icon" className="landing-section-2-images"/></center>
              <p class="white-text">Receive Squish Merch</p>
            </Col>
            <Col xs={4}>
              <center><img src={advocate} alt="Sharing Icon" className="landing-section-2-images"/></center>
              <p class="white-text">Advocate on Mental Health. Ultimately bringing change into the world.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} id="form-section">
              <center>
              <h3 id="sec-3-header">If you would like to join us, click the button below and fill out the form.</h3>
                <button type="button" class="btn btn-primary btn-lg" id="sec-3-button" onClick={this.showModal}>
                  Subscribe
                </button>
                </center>
            </Col>
          </Row>
        </Container>


      </div>
    )
  }
}

export default Landing 