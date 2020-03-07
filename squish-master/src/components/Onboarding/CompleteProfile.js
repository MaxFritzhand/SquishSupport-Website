import React, { Component } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { completeProfile, getUser, formatPhone} from '../Account/UserFunctions'
import { flaskFinishedOnboarding, flaskFinishedSpecialties } from '../Account/CheckUserOnboardingStatus'
import { convertZip } from '../Account/ZipFunction'
import completeProfileImage from '../../assets/complete-profile-image.png'
import './completeprofile.css'
import './onboarding.css'

class CompleteProfile extends Component {
  constructor() {
    super()
    this.state = {
      university: null,
      phone: null,
      experience: null,
      zipcode: null,
      city: null,
      state: null,
      zipErrors: null,
      finished: false
    }
    this.cityInput = React.createRef();
    this.userStateInput = React.createRef()
  }

  componentDidMount() {
    flaskFinishedOnboarding().then((response) => {
      if (response === 'true') {
        this.props.history.push('/profile')
      } else {
        flaskFinishedSpecialties().then((response => {
          if (response === 'false') {
            this.props.history.push('/onboarding/specialties')
          } 
        }))
      }
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setLocation = () => {
    this.setState({
      city: this.cityInput.current.value,
      state: this.userStateInput.current.value
    })
  }

  handleZip = (e) => {
    e.preventDefault();
    this.setState({
      zipcode: e.target.value
    })
    convertZip() 
  }

  handlePhone = (e) => {
    let number = e.target.value
    let formatted = formatPhone(number)
    this.setState({
      phone: formatted
    })
  }


  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      city: this.cityInput.current.value,
      state: this.userStateInput.current.value
    }, () => {
      completeProfile(this.state).then(() => {
        getUser().then(() => {
          this.setState({
            finished: true
          })
        })
      })
    });
  }


  render() {
    const { university, phone, experience, zipErrors, finished } = this.state

    if (finished) {
      this.props.history.push('/welcome')
    }

    return(
      <Container className="complete-profile-bg">


        <Container id="complete-profile-container">
          <Row id="image-row">
              <img src={completeProfileImage} id="complete-profile-image" alt="medical notepad"/>
          </Row>

          <Row id="subtext-row">
              <p id="onboarding-header">Complete Profile</p>
              <div id="onboarding-subtext">Please provide a couple bits of information to finalize your Squish Profile</div>
          </Row>

          {/* <Row id="add-pic-row">
            <Col>
              <img src={addAvatar} id="add-profile-pic" alt="space to add a profile"/>
            </Col>
          </Row> */}

{/* onInput={this.setCity} */}
{/* onChange={this.setUserState}  */}

          <Row id="complete-profile-row">
            <Col>
              <form className="profile-form form-group" onSubmit={this.onSubmit}>
                <input type="text" className="complete-profile-input form-control" name="university" value={university} onChange={this.onChange} placeholder="University (if applicable)" />
                <input type="phone" className="complete-profile-input form-control" name="phone" value={phone} onChange={this.handlePhone} placeholder="Phone" pattern=".{14,14}" title="Minimum 10 Digits Required" maxLength="14" required />
                {/* <input type="number" className={zipErrors ? "complete-profile-input form-control input-error" : "complete-profile-input form-control"} name="zipcode" value={zipcode} onChange={this.onChange} placeholder="ZipCode" required/> */}
                <input type="phone" className="complete-profile-input form-control" name="experience" value={experience} onChange={this.onChange} pattern=".{1,3}" title="Please enter your relative years of experience." maxLength="3" placeholder="Years of Experience" required/>
                <input type="text" className={zipErrors ? "complete-profile-input form-control input-error" : "complete-profile-input form-control"} name="zipcode" onChange={this.handleZip} placeholder="ZipCode" required/>
                <span id="zipErrors"></span>
                <input type="text" className="complete-profile-input form-control" ref={this.cityInput} name="city" placeholder="City"/>
                <input type="text" className="complete-profile-input form-control" ref={this.userStateInput} name="state" placeholder="State"/>

                <div className="checkboxes form-group">
                  <label><input type="checkbox" name="truthful" required /> <span>I confirm the information above is true</span></label>
                  <label><input type="checkbox" name="terms" required /> <span>I agree with the Terms and Conditions</span></label>
                </div>

            <Row id="onboarding-bottom-row">
              <Col xs={12} sm={12} md={4} lg={8} className="form-group" id="onboarding-bottom-left">
                <Link to="/"><button className="cancel-button form-group">Cancel</button></Link>
              </Col>
              <Col xs={12} sm={12} md={4} lg={2} className="form-group">
                <Link to="/onboarding/specialties"><button className="step-buttons">Back</button></Link>
              </Col>
              <Col xs={12} sm={12} md={4} lg={2} className="form-group">
                <button type="submit" className="step-buttons">Finish</button>
              </Col>
            </Row>
            </form>
            </Col>
          </Row>

        </Container>

      </Container>
    )
  }
}

export default withRouter(CompleteProfile);


