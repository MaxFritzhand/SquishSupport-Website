import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { changePassword, getUser } from '../UserFunctions'
import { compose } from 'recompose'

class MobileResetPassword extends Component {
  constructor(props) {
    super(props) 
    const { cookies } = props
    this.state = {
      email: cookies.get('email'),
      password: null,
      passwordMatch: null,
      noMatch: null
    }
  } 

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  }

  changePassword = (e) => {
    e.preventDefault();
    const { password, passwordMatch, email } = this.state
    const user = {password, email }
    if ( password === passwordMatch ) {
      changePassword(user).then(res => {
        if (res.token) {
          getUser().then(() => {
            this.props.history.push('/profile')
          })
        }
      })
    } else {
      this.setState({
        noMatch: "Passwords do not match!"
      })
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  


  render() {
    const { password, passwordMatch, noMatch} = this.state

    return(
      <Container className="mobile-misc-screens-container">
        <Row className="mobile-misc-screens">
          <Col xs={12}>
            <form className="form-group" onSubmit={this.onSubmit}>
              <h1>Confirmed!</h1>
              <span id="new-password-text">Please enter a new password and submit to confirm</span>
              <input type="password" name="password" className="mobile-std-input" value={password} onChange={this.onChange} pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" title="Must contain at least one number, one uppercase letter, and at least 8 ore more characters" placeholder="Password" />
              <input type="password" name="passwordMatch" className={noMatch ? 'password-input-error' : 'mobile-std-input'} value={passwordMatch} onChange={this.onChange} pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" title="Must contain at least one number, one uppercase letter, and at least 8 ore more characters" placeholder="Confirm Password" />
              <center><span id="signup-errors">{noMatch}</span></center>
              <button id="mobile-login-button" type="submit">Set New Password</button>
            </form>
          </Col>
        </Row>
        <Row className="mobile-misc-screens-bottom">
          <Col xs={12}>
            <h1>Almost There!</h1>
            <p>Enter a New Password and you'll be back on Squish in no time.</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  withCookies,
  withRouter)(MobileResetPassword);