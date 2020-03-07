import React, { Component } from 'react'
import MobileConfirmCode from '../Mobile/MobileConfirmCode'
import MediaQuery from 'react-responsive'
import { withCookies } from 'react-cookie'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import imageOne from '../../../assets/login-signup-1.svg'

class ConfirmCode extends Component {
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      code: cookies.get('code'),
      email: cookies.get('email'),
      key: '',
      invalidCode: null
    }
  }

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  }

  submitCode = (e) => {
    e.preventDefault();
    const {key , code} = this.state
    if (key === code) {
      this.props.history.push('/resetpassword')
    } else {
      this.setState({
        invalidCode: "Incorrect Activation Code"
      })
    }
  }

  onChange = (e) => {
    this.setState({
      key: e.target.value
    })
  }
  


  render() {
    const { invalidCode, key } = this.state 
    return(
      <div className="wrapper">
        <MediaQuery minDeviceWidth={581}>
          <div className="main-container" id="main-container">

            <div className="form-container sign-in-container">
              <form className="form-group account-form">
                <h1 className="account-header">Enter Code</h1>
                <input type="number" className={invalidCode ? "activation-input-error" : "short-std-input"} value={key} min="1000" max="9999" onChange={this.onChange} required placeholder="Code" />
                <center><p id="activation-errors">{invalidCode}</p> </center>
                <button className="std-button" type="submit" onClick={this.submitCode}>Submit Code</button>
                <Link to="/reset-link">Resend Code?</Link>
              </form>
              <div className="circle"></div>
              <div className="circle-2"></div>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                    <h1 className="account-header">Welcome Back!</h1>
                    <p className="login-signup-text">Enter the code sent to your email and set a new password!</p>
                    <div className="login-signup-image-1">
                      <img src={imageOne} id="login-signup-image-1" alt="computer"/>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={580}>
            <MobileConfirmCode/>
        </MediaQuery>
      </div>
    )
  }
}

export default compose(
  withCookies,
  withRouter)(ConfirmCode);