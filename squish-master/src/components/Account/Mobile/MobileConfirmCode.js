import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import './mobile.css'

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
      <Container className="mobile-misc-screens-container">
        <Row className="mobile-misc-screens">
          <Col xs={12}>
            <form className="form-group" onSubmit={this.onSubmit}>
              <h1>Enter Code</h1>
              <input type="number" className={invalidCode ? "activation-input-error" : "short-std-input"} value={key} min="1000" max="9999" onChange={this.onChange} required placeholder="Code" />
              <center><p id="mobile-activation-errors">{invalidCode}</p> </center>
              <button className="mobile-button" id="mobile-login-button" type="submit" onClick={this.submitCode}>Submit Code</button>
              <div><Link to="/reset-link">Resend Code?</Link></div>
            </form>
          </Col>
        </Row>
        <Row className="mobile-misc-screens-bottom">
          <Col xs={12}>
            <h1>Welcome Back!</h1>
            <p>Enter the code sent to your email and set a new password!</p>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default compose(
  withCookies,
  withRouter)(ConfirmCode);