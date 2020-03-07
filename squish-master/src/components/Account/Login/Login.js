import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login, getUser } from '../UserFunctions'
import '../account.css'

class Login extends Component {
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
      <div className="form-container sign-in-container">
      <form className="form-group account-form" onSubmit={this.onSubmit} >
        <h1 className="account-header">Login</h1>
        <div className="social-container">
          <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social"><i className="fab fa-google"></i></a>
          <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your account</span>
        <div id="login-input-container">
          <input type="email" name="email" className={emailError ? "input-error" : "std-input"} value={email} onChange={this.onChange} placeholder="Email" required />
            <span id="login-errors">{emailError}</span>
          <input type="password" name="password" className={passwordError ? "input-error" : "std-input"} value={password} onChange={this.onChange} placeholder="Password" required />  
            <span id="login-errors">{passwordError}</span>
        </div>

        <button type="submit" className="std-button" id="login-button">Log In</button>
        <Link to="/reset-link">Forgot Password?</Link>
      </form>
      <div className="circle"></div>
      <div className="circle-2"></div>
    </div>
    )
    
  }
}

export default Login

