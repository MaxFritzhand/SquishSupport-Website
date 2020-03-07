import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
      <div className="mobile-form-container mobile-login-container">
        <form className="form-group mobile-account-form" onSubmit={this.onSubmit}>
          <h1 className="mobile-account-header">Login</h1>
          <div className="mobile-social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className="form-span">or use your account</span>
          <div id="mobile-login-input-container">
            <input type="email" name="email" className={emailError ? "input-error" : "mobile-std-input"} value={email} onChange={this.onChange} placeholder="Email" required />
            <span id="login-errors">{emailError}</span>
            <input type="password" name="password" className={passwordError ? "input-error" : "mobile-std-input"} value={password} onChange={this.onChange} placeholder="Password" required />  
            <span id="login-errors">{passwordError}</span> 
            <button type="submit" className="mobile-button" id="mobile-login-button">Log In</button>
            <div className="forgot-password-link"><Link to="/reset-link">Forgot Password?</Link></div>
          </div>
        </form>
      </div>
    )
  }
}
