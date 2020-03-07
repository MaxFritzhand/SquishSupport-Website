import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { login, getUser } from '../UserFunctions'
import './mobile.css'

export default class MobileLogin extends Component {
  constructor() {
    super() 
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      loggedIn: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      this.setState({
        passwordError: null,
        emailError: null
      })
      if (res.invalidPass) {
        this.setState({
          passwordError: res.invalidPass
        })
      } else if (res.invalidEmail) {
        this.setState({
          emailError: res.invalidEmail
        })
      } else if (res.token) {
        getUser().then(() => {
          this.setState({loggedIn: true})
        })
        }
      }
    )
  }

  render() {
    const { email, password, loggedIn, emailError, passwordError } = this.state
    if ( loggedIn ) {
      return <Redirect to ="/profile"/>
    } 
    return(
      // <div className="phone-login-container">
      //   <form className="form-group phone-account-form" onSubmit={this.onSubmit}>
      //     <h1 className="phone-account-header">Login</h1>
          // <div className="phone-social-container">
          //   <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
          //   <a href="#" className="social"><i className="fab fa-google"></i></a>
          //   <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          // </div>
      //     <span className="form-span">or use your account</span>
          // <div id="phone-login-input-container">
          //   <input type="email" name="email" className={emailError ? "input-error" : "mobile-std-input"} value={email} onChange={this.onChange} placeholder="Email" required />
          //   <span id="login-errors">{emailError}</span>
          //   <input type="password" name="password" className={passwordError ? "input-error" : "mobile-std-input"} value={password} onChange={this.onChange} placeholder="Password" required />  
          //   <span id="login-errors">{passwordError}</span> 
          //   <button type="submit" className="phone-button" id="phone-login-button">Log In</button>
          //   <div className="forgot-password-link"><Link to="/reset-link">Forgot Password?</Link></div>
          // </div>
      //   </form>
      //   <div className="phone-login-subsection">
      //       <h1 className="phone-account-header">Don't Have an Account?</h1>
      //       <p className="phone-login-signup-text">Click the button below to start your journey with us</p>
      //       <center><button className="phone-button ghost" onClick={this.props.onClick}>Sign Up</button></center>
      //     </div>
      // </div>
      <Container id="phone-login-container">
        <Row id="phone-login-section">
          <Col xs={12}>
            <form className="form-group" onSubmit={this.onSubmit}>
              <h1>Login</h1>
              <div className="phone-social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span id="phone-login-span">or use your account</span>
              <div id="phone-login-input-container">
                <input type="email" name="email" className={emailError ? "input-error" : "mobile-std-input"} value={email} onChange={this.onChange} placeholder="Email" required />
                <span id="login-errors">{emailError}</span>
                <input type="password" name="password" className={passwordError ? "input-error" : "mobile-std-input"} value={password} onChange={this.onChange} placeholder="Password" required />  
                <span id="login-errors">{passwordError}</span> 
                <button type="submit" className="phone-button" id="phone-login-button">Log In</button>
                <div className="forgot-password-link"><Link to="/reset-link">Forgot Password?</Link></div>
               </div>
            </form>
          </Col>
        </Row>
        <Row id="phone-login-subsection">
          <Col xs={12}>
            <h2>Don't have an account?</h2>
            <p>Click the button below to start your journey with us.</p>
            <button className="phone-button ghost" onClick={this.props.onClick}>Sign Up</button>
          </Col>
        </Row>
      </Container>
      
    )
  }
}
