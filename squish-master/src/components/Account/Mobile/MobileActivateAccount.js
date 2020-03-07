import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { activationLogin, activate, checkActivatedUser } from '../UserFunctions'
import { flaskFinishedOnboarding, flaskFinishedProfile, flaskFinishedSpecialties } from '../CheckUserOnboardingStatus'
import '../account.css'


class MobileActivateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activationKey: '',
      activated: false,
      invalidCode: null
    }
  }

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
    navLinks.classList.add("purple-bg")
    navLinks.classList.remove("white-bg")

    flaskFinishedOnboarding().then((response) => {
      if (response === 'true') {
        this.props.history.push('/profile')
      } else {
        flaskFinishedSpecialties().then((response => {
          if (response === 'true') {
            this.props.history.push('/onboarding/complete-profile')
          }
        }))
      }
    })
  }

  onChange = (e) => {
    this.setState({
      activationKey: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email")
    const key = localStorage.getItem("key")
    const user = {
      email: email,
      code: key
    }

    if (key === this.state.activationKey) {
      activate(user).then(res => {
        if (res.success) {
          activationLogin(user).then(res => {
            if (res.email) {
              this.setState({activated: true})
            }
          })
        }
      })
    } else {
      this.setState({
        invalidCode: "Incorrect Activation Code"
      })
    }
  }

  resendLink = (e) => {
    e.preventDefault()
    localStorage.removeItem('key')
    this.props.history.push('/resend-link')
  }



  render() {
    const { activated, invalidCode, activationKey } = this.state

    if ( activated ) {
      return <Redirect to='/onboarding/specialties'/> 
    }

    return(
      <Container className="mobile-misc-screens-container">
        <Row className="mobile-misc-screens">
          <Col xs={12}>
            <form className="form-group" id="mobile-activation-form" onSubmit={this.onSubmit}>
              <h1> Activate Account </h1>
              <span>Enter the activation key sent to your email</span>
              <div><input type="number" className={invalidCode ? "mobile-activation-input-error " : "mobile-short-std-input"} value={activationKey} min="1000" max="9999" onChange={this.onChange} placeholder="Code" required/></div>
              <div id="mobile-activation-errors">{invalidCode}</div>
              <button className="std-button" type="submit">Submit Code</button>
              <div><Link onClick={this.resendLink}>Resend Code?</Link></div>

            </form>
          </Col>
        </Row>
        <Row className="mobile-misc-screens-bottom">
          <Col xs={12}>
            <h1 id="mobile-activation-header">Get Ready to Complete Your Profile!</h1>
            <p id="mobile-activation-subtext">After activation, you will be directed to our onboarding process.</p>
          </Col>
        </Row>
      </Container>
    )
  } 
}

export default withRouter(MobileActivateAccount)

