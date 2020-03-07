import React, { Component } from 'react'
import Countdown from '../Countdown/countdown'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import darkMode from '../../assets/dark-mode-iphone.png'
import squishGraphic from './assets/squish-graphic.svg'
import section_four_img from './assets/home-section-4-img.png'
import section_five_img_1 from './assets/section-5-image-1.svg'
import section_five_img_2 from './assets/section-5-image-2.svg'
import section_five_img_3 from './assets/section-5-image-3.svg'
import twoPhones from '../../assets/hello.png'
import appStore from './assets/appstore.jpg'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png' 
import medium from '../../assets/medium.png'
import './home.css'

class Home extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      visited: null
    }
  }

  listenScroll = e => {
    const nav = document.getElementById("squish-nav")
    if (window.scrollY > 417) {
      nav.classList.add("scrolled-bg")
    } else {
      nav.classList.remove("scrolled-bg")
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScroll, true)
    const hasVisited = localStorage.getItem('hasVisited')
    const nav = document.getElementById("squish-nav")
    nav.classList.add("nav-home-bg")
    if (hasVisited === null) {
      this.setState({
        visited: false
      })
    } else {
      this.setState({
        visited: true
      })
    }
  }

  componentWillUnmount() {
    const nav = document.getElementById("squish-nav")
    nav.classList.remove("nav-home-bg")
  }


  render() {
    const { visited } = this.state
    if (visited === false) {
      return <Redirect to='/squish'/>
    } else  {
      return(
        <div className="wrapper">
          <Container id="home-section-1">
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <div id="home-top-left-text">Your Absolute Mental Health Space</div>
                  <div id="home-top-left-subtext">Striving to make a difference in the mental health <br/> community one Squisher at a time.</div>
                  <Link to="/account"><button className="home-section-1-button">Sign Up Today</button></Link>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <img src={darkMode} id="home-section-img" alt="dark-mode-iphone"/>
                </Col>
              </Row>
          </Container>

          <Container id="home-section-2">
              <Row>
                <Col xs={12} sm={6} id="home-section-2-left-col">
                  <img src={squishGraphic} alt="custom-squish-logo-graphic"/>
                </Col>
                <Col xs={12} sm={6}>
                  <Row id="home-section-2-top-row"><h2 id="home-section-2-header">What is Squish?</h2></Row>
                  <Row><div id="home-section-2-text">We are here to end the stigma surrounding mental health. Squish is at the forefront in today's mental health space combating this issue. We connect like minded individuals to open a dialogue about an ongoing problem to find a solution. </div></Row>
                  <Row id="home-section-2-bottom-row"><button id="home-section-2-button"><Link to='/about' id="learn-more-button">Learn More</Link></button></Row>
                </Col>
              </Row>
            </Container>

            <Container id="home-section-3">
              <Row id="home-section-3-header">
                <div>
                  Getting Started
                </div>
              </Row>
              <Row>
                <Col xs={12} sm={4}>
                  <Container className="home-section-3-getting-started">
                    <Row className="getting-started-step"><div className="step-number">1</div></Row>
                    <Row className="getting-started-text">Create a Seeker or Supporter Account</Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <Container className="home-section-3-getting-started">
                    <Row className="getting-started-step"><div className="step-number">2</div></Row>
                    <Row className="getting-started-text">Take a Personality Quiz</Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <Container className="home-section-3-getting-started">
                    <Row className="getting-started-step"><div className="step-number">3</div></Row>
                    <Row className="getting-started-text">Schedule your First Meeting</Row>
                  </Container>
                </Col>
              </Row>
            </Container>
    
            <Container id="home-section-4">
              <Row id="home-section-4-header">Secure and Safe</Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={5}>
                  <img src={section_four_img} id="section-4-img" alt="sample-of-squish-mobile-app"/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={7} id="home-section-4-right-col">
                  <Row id="section-4-description-1">
                    <Col xs={1} className="bullet-point"><div className="home-section-4-bullet"></div></Col>
                    <Col xs={10}><div>Privacy, anonymity, all catered to you in the comfort of your own home. Secure end to end encryption. No tracking or monitoring of your data</div></Col>
                  </Row>
                  <Row id="section-4-description-2">
                    <Col xs={1} className="bullet-point"><div className="home-section-4-bullet"></div></Col>
                    <Col xs={10}><div>Be able to express, discover, and grow yourself with identity protection. Feel safe knowing you have an outlet to your true self.</div></Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <Container id="home-section-5">
              <Row> 
                <Col xs={12} sm={4}>
                  <Container className="home-section-5-column">
                    <Row className="home-section-5-img"><img src={section_five_img_1} alt="Incentives"/></Row>
                    <Row className="home-section-5-header">Incentives</Row>
                    <Row className="home-section-5-text">Encouragement for self improvement through wholesome decisions</Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <Container className="home-section-5-column">
                    <Row className="home-section-5-img"><img src={section_five_img_2} alt="Convenience"/></Row>
                    <Row className="home-section-5-header">Convenience</Row>
                    <Row className="home-section-5-text">Anytime. Anywhere. Have a friend one dial away.</Row>
                  </Container>
                </Col>
                <Col xs={12} sm={4}>
                  <Container className="home-section-5-column">
                    <Row className="home-section-5-img"><img src={section_five_img_3} alt="Relatability"/></Row>
                    <Row className="home-section-5-header">Relatability</Row>
                    <Row className="home-section-5-text">Diverse individuals with various experiences.</Row>
                  </Container>
                </Col>
              </Row>
            </Container>

            <Container id="home-section-6">
              <Row>
                <Col xs={12} sm={12} md={6} id="section-6-left">
                  <Row id="section-6-left-header">Available for your smartphones soon!</Row>
                  <Row id="section-6-left-text">Our super awesome app will be launched in:</Row>
                    <Countdown date={`${2020}-01-07T00:00:00`} />
                  <Row >
                    <img src={appStore} id="section-6-image-2"alt="linked buttons to google play or apple app store"/>
                  </Row>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <Row id="section-6-images">
                    <img src={twoPhones} id="section-6-image" alt="sample-of-squish-app-messaging"/>
                  </Row>
                </Col>
              </Row>
            </Container>
    
            <Container id="home-section-7">
              <Container id="section-7">
                  <Row id="home-section-7-text">
                    Ready to help revolutionize Mental Health?
                  </Row>
                  <Row id="home-section-7-subtext">
                    Try Squish!
                  </Row>
                  <Row id="home-section-7-footer">
                    Follow us on social media to see what we're up to.
                  </Row>
                  
                  <Container>
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
              </Container>
            </Container>
        </div>
      )
    }
  }
}

export default Home 