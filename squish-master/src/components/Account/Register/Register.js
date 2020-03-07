import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { register, emailActivationCode } from '../UserFunctions'
import '../account.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
      activationKey: null
    }
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    const { firstName, lastName, email, password } = this.state
    e.preventDefault();
    if (this.state.password.length < 6) {
      this.setState({
        passwordError: "Password Must Be Greater Than 6 Characters"
      })
      // fix
      return this.state.errors
    }
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }

    register(newUser).then(res => {
      if (res.email) {
        const email = res.email
        const activationCode = Math.floor(1000 + Math.random() * 9000)
        const path = "https://www.squishsupport.com/account/activate"
        const user = { email, activationCode, path }
        emailActivationCode(user).then(res => {
          this.setState({ activationKey: activationCode })
        })
      } else {
        this.setState({
          email: null,
          emailError: res.invalidEmail
        })
      }
    })
  }
  


  render() {
    const { firstName, lastName, email, password, firstNameError, lastNameError, emailError, passwordError, activationKey} = this.state
    if (activationKey !== null) {
      return <Redirect to ='/account/activate' />
    }
    return(
      <div className="form-container sign-up-container">
        <form className="form-group account-form" onSubmit={this.onSubmit}>
          <h1 className="account-header">Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
        <span>or use your account</span>

          <div id="signup-input-container">
            <input type="text" className={firstNameError ? "input-error" : "std-input"} name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" required />
              <span id="signup-errors">{firstNameError}</span>
            <input type="text" className={lastNameError ? "input-error" : "std-input"} name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" required />
              <span id="signup-errors">{lastNameError}</span>
            <input type="email" className={emailError ? "input-error" : "std-input"} name="email" value={email} onChange={this.onChange} placeholder="Email" required />
             <span id="signup-errors">{emailError}</span>
            <input type="password" className={passwordError ? "input-error" : "std-input"} name="password" value={password} onChange={this.onChange} pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" title="Must contain at least one number, one uppercase letter, and at least 8 ore more characters" placeholder="Password" required />
              <span id="signup-errors">{passwordError}</span>
          </div>

        <button className="std-button" id="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
    )
  }
}

export default Register

// return( <ActivateAccount info={email} code={activationKey}/>)