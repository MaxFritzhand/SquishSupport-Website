 import React, { Component } from 'react'
 import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { setSpecialties, checkActivatedUser } from '../Account/UserFunctions'
import { flaskFinishedOnboarding } from '../Account/CheckUserOnboardingStatus'
import check from '../../assets/check.svg'
import './sample.css'
import './specialtybubbles.scss'

class Specialties extends Component {
  constructor() {
    super() 
    this.state = {
      specialties: [],
      errors: []
    }
  }

  addSpecialty = (e) => {
    e.preventDefault();
    const element = e.currentTarget;
    const name = element.attributes.name.value;
    const resized = name + '-bubble-clicked';
    if (!element.classList.contains(resized) ) {
      // Add Specialty to State
      this.setState(prevState => ({
        specialties: [...prevState.specialties, name]
      }))
      // Enlarge Bubble
      element.classList.remove(name + '-bubble');
      element.classList.add(resized)
      const elementImg = document.createElement("img");
      elementImg.src = check
      elementImg.id = "check"
      element.appendChild(elementImg)
    } else {
      // Remove Specialty from State
      const { specialties } = this.state
      const removeSpecialty = specialties.indexOf(name)
      specialties.splice(removeSpecialty, 1)
      this.setState({
        specialties: specialties
      })
      // Shrink Bubble
      element.classList.add(name + '-bubble');
      element.classList.remove(resized)
      const imgChild = element.lastChild
      element.removeChild(imgChild);
    }
  }
  // {errors.length === 0 ? null : (<center><div className="speech-bubble"> {errors} </div></center>) }
  submitSpecialty = (e) => {
    e.preventDefault();
    const { specialties } = this.state
    if (specialties.length > 0) {
      setSpecialties(this.state.specialties)
      this.props.history.push('/onboarding/complete-profile')
    } else {
      this.setState({
        errors: "Please Select At Least One Specialty"
      })
    }
  }
// ADD A SPECIALTIES CHECK
  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.remove("white-bg")
    navHome.classList.add("purple-bg")
    // navLinks.classList.remove("strange")
    // navLinks.classList.add("specialities")
    flaskFinishedOnboarding().then((response) => {
      if (response === 'true') {
        this.props.history.push('/profile')
      } else {
        checkActivatedUser().then((response) => {
          if (response === 'false') {
            this.props.history.push('/account/activate')
          } 
        })
      }
    })
  }

  render() {
    const { errors } = this.state
    return(
      <div className="onboarding-page">
        <Container id="onboarding-container">
        <Row id="errors-row">{errors.length === 0 ? null : (<center><div className="speech-bubble"> {errors} </div></center>) }</Row>
          <Row id="specialty-header">What Do You Specialize In?</Row>
          <Row id="specialty-subtext">Pick the types of mental illnesses that <br/> you are looking to squish.</Row>
          <Row className="bubble-row">
            <Col xs={3} sm={3} className="bubble-col">
              <Row><div className="specialty-bubble addiction-bubble" name="addiction" onClick={this.addSpecialty}><p className="bubble-text">Addiction</p></div></Row>
            </Col>
            <Col xs={2} sm={3} id="smaller-circle-col">
              <Row><div className="specialty-bubble ptsd-bubble" name="ptsd" onClick={this.addSpecialty}><p className="bubble-text">PTSD</p></div>
              <div className="specialty-bubble adhd-bubble" name="adhd" onClick={this.addSpecialty}><p className="bubble-text">ADHD</p></div></Row>
            </Col>
            <Col xs={3} sm={3} className="bubble-col">
              <Row><div className="specialty-bubble schizophrenia-bubble scaled" name="schizophrenia" onClick={this.addSpecialty}><p className="bubble-text">Schizophrenia</p></div></Row>
            </Col>
            <Col xs={4} sm={3} className="bubble-col">
              <Row><div className="specialty-bubble bipolar-affective-bubble scaled" name="bipolar-affective" onClick={this.addSpecialty}><p className="bubble-text">Bipolar Affective</p></div></Row>
            </Col>
          </Row>
          <Row className="bubble-row-2">
            <Col xs={5} sm={5} className="bubble-col">
              <Row>
                <div className="specialty-bubble depression-bubble scaled" name="depression" onClick={this.addSpecialty}><p className="bubble-text">Depression</p></div>
                <div className="specialty-bubble ocd-bubble scaled" name="ocd" onClick={this.addSpecialty}><p className="bubble-text">OCD</p></div>
              </Row>
            </Col>
            <Col xs={2} sm={2} className="bubble-col">
              <Row><div className="specialty-bubble eating-bubble" name="eating" onClick={this.addSpecialty}><p className="bubble-text">Eating</p></div></Row>
            </Col>
            <Col xs={5} sm={5} className="bubble-col">
              <Row className="bubble-row">
                <div className="specialty-bubble anxiety-bubble scaled" name="anxiety" onClick={this.addSpecialty}><p className="bubble-text">Anxiety</p></div>
                <div className="specialty-bubble body-image-bubble scaled" name="body-image" onClick={this.addSpecialty}><p className="bubble-text">Body Image</p></div>
              </Row>
            </Col>
          </Row>    
          <Row id="specialties-bottom-row"><button className="std-button" type="submit" onClick={this.submitSpecialty}>Submit</button></Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Specialties)



       /* <Row id="image-row">
            <Col>
            {errors.length === 0 ? null : (<center><div className="speech-bubble"> {errors} </div></center>) }
              <img src={specialtiesImage} id="onboarding-image" alt="hospital"/>
            </Col>
          </Row>  */