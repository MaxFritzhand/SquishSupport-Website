import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Card} from 'react-bootstrap'
import { flaskFinishedSpecialties, flaskFinishedProfile } from '../Account/CheckUserOnboardingStatus'
import { checkActivatedUser } from '../Account/UserFunctions'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css';
import Logo from './assets/Squish LOGO svg.svg'
import './userprofile.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: localStorage.name,
      email: localStorage.email,
      experience: localStorage.experience,
      city: localStorage.city,
      userState: localStorage.state,
      university: localStorage.university,
      specialties: localStorage.specialties,
      specialtiesCount: localStorage.specialtiesCount,
      toggle: false
    }
  }

  onClick = (e) => {
    const { toggle } = this.state
    const Nav = document.getElementById("sidebar")
    const Dash = document.getElementById("dashboard-main")
    if (toggle === false) {
      Nav.classList.add("active")
      Dash.classList.add("active")
      this.setState({
        toggle: true
      })
    } else {
      Nav.classList.remove("active")
      Dash.classList.remove("active")
      this.setState({
        toggle: false
      })
    }
  }

  componentDidMount() {
    const navHome = document.getElementById("nav-home") 
    navHome.classList.add('removing-from-profile')

    checkActivatedUser().then((response) => {
      if (response === 'false') {
        this.props.history.push('/account/activate')
      } else {
        flaskFinishedSpecialties().then((response) => {
          if (response === 'false') {
            this.props.history.push('/onboarding/specialties')
          } else {
            flaskFinishedProfile().then((response) => {
              if (response === 'false') {
                this.props.history.push('/onboarding/complete-profile')
              }
            })
          }
        })
      }
    })
  }


  render() {
    const {name, email, experience, city, userState, university, specialties, specialtiesCount} = this.state

    return(
      <div className="profile-page-container">
 
        <Row id="modules-section">
          <Col xs={12} md={12} lg={12}>
            <Card id="modules-card">
              <div className="card-header-tab card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                  Supporter Module Tracker
                </div>
                <div className="btn-actions-pane-right">
                  {/* <button type="button" className="border-0 btn-pill btn-wide btn-transition active btn btn-outline-primary"></button> */}
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane active">
                  <div className="pt-2 card-body"
                  ><div className="mt-3 row">
                    <div className="col-md-6">
                      <div className="widget-content">
                        <div className="widget-content-outer">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-numbers fsize-3 text-muted">14%</div>
                            </div>
                            <div className="widget-content-right">
                              <div className="text-muted opacity-6">Monthly Increase in Activity</div>
                            </div>
                          </div>
                          <div className="widget-progress-wrapper mt-1">
                            <div className="progress-bar-sm progress-bar-animated-alt progress">
                              <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="63" aria-valuemin="0" aria-valuemax="100">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                  <div className="col-md-6">
                    <div className="widget-content">
                      <div className="widget-content-outer">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left mr-3">
                            <div className="widget-numbers fsize-3 text-muted">98%</div>
                          </div>
                          <div className="widget-content-right">
                            <div className="text-muted opacity-6">Seeker Approval Rating</div>
                          </div>
                        </div>
                        <div className="widget-progress-wrapper mt-1">
                          <div className="progress-bar-sm progress-bar-animated-alt progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider mt-4">
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="widget-content">
                        <div className="widget-content-outer">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <div className="widget-numbers fsize-3 text-muted">
                                33%
                              </div>
                            </div>
                            <div className="widget-content-right">
                              <div className="text-muted opacity-6">
                                Squish Supporter Modules 
                              </div>
                            </div>
                          </div>
                          <div className="widget-progress-wrapper mt-1">
                            <div className="progress-bar-sm progress-bar-animated-alt progress">
                              <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-numbers fsize-3 text-muted">
                                  5%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Monthly Balance Increase
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="41" aria-valuemin="0" aria-valuemax="100">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  
                  <div className="widget-chart p-0">
                    <div className="widget-chart-content">
                      <div className="widget-description mt-0 text-warning">
                          <path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
                          </path>

                        <span className="pl-1">91%</span>
                        <span className="text-muted opacity-8 pl-1">Squish Grade</span>
                      </div>
                    </div>
                    <div className="recharts-responsive-container">
                      <div className="recharts-wrapper">
                        <svg className="recharts-surface" width="470" height="187" viewBox="0 0 470 187" version="1.1">
                          <defs>
                            <clipPath id="recharts215-clip">
                              <rect x="0" y="-45" height="232" width="470">
                              </rect>
                            </clipPath>
                          </defs>
                        <defs>
                      <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stop-color="var(--warning)" stop-opacity="0.7">
                        </stop>
                        <stop offset="90%" stop-color="var(--warning)" stop-opacity="0">
                        </stop>
                      </linearGradient>
                    </defs>
                  <g className="recharts-layer recharts-area">
                    <g className="recharts-layer">
                
                    </g>
                  </g>
                </svg>
      
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane">
          <div className="widget-chart p-0">
            <div className="recharts-responsive-container">
            </div>
            <div className="widget-chart-content mt-3 mb-2">
              <div className="widget-description mt-0 text-success">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" className="svg-inline--fa fa-arrow-up fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z">
                  </path>
                </svg>
                <span className="pl-2 pr-2">37.2%</span>
                <span className="text-muted opacity-8">performance increase</span>
              </div>
            </div>
          </div>
          <div className="pt-2 card-body">
            <div className="row">
              <div className="col-md-6"
              ><div className="widget-content">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                      <div className="widget-numbers fsize-3 text-muted">
                        23%
                      </div>
                    </div>
                    <div className="widget-content-right">
                      <div className="text-muted opacity-6">
                        Deploys
                      </div>
                    </div>
                  </div>
                <div className="widget-progress-wrapper mt-1">
                  <div className="progress-bar-sm progress-bar-animated-alt progress">
                    <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="23" aria-valuemin="0" aria-valuemax="100">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left mr-3">
                    <div className="widget-numbers fsize-3 text-muted">
                      76%
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="text-muted opacity-6">
                      Traffic
                    </div>
                  </div>
                </div>
                <div className="widget-progress-wrapper mt-1">
                  <div className="progress-bar-sm progress-bar-animated-alt progress">
                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100"></div></div></div></div></div></div></div><div className="divider mt-4"></div><div className="row"><div className="col-md-6"><div className="widget-content"><div className="widget-content-outer"><div className="widget-content-wrapper"><div className="widget-content-left mr-3"><div className="widget-numbers fsize-3 text-muted">83%</div></div><div className="widget-content-right"><div className="text-muted opacity-6">Servers Load</div></div></div><div className="widget-progress-wrapper mt-1"><div className="progress-bar-sm progress-bar-animated-alt progress"><div className="progress-bar bg-danger" role="progressbar" aria-valuenow="83" aria-valuemin="0" aria-valuemax="100"></div></div></div></div></div></div><div className="col-md-6"><div className="widget-content"><div className="widget-content-outer"><div className="widget-content-wrapper"><div className="widget-content-left mr-3"><div className="widget-numbers fsize-3 text-muted">48%</div></div><div className="widget-content-right"><div className="text-muted opacity-6">Reported Bugs</div></div></div><div className="widget-progress-wrapper mt-1"><div className="progress-bar-sm progress-bar-animated-alt progress"><div className="progress-bar bg-alternate" role="progressbar" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div></div></div></div></div></div></div></div></div></div>
            </Card>
            <Card>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>

    </div>
    )
  }

}

export default Profile


  // componentDidMount() {
  //   const navHome = document.getElementById("nav-home")
  //   const navLinks = document.getElementById("nav-links")
  //   navHome.classList.remove("white-bg")
  //   navHome.classList.add("purple-bg")
  //   navLinks.classList.remove("specialties")
  //   navLinks.classList.add("welcome-page")

  //   checkActivatedUser().then((response) => {
  //     if (response === 'false') {
  //       this.props.history.push('/account/activate')
  //     } else {
  //       flaskFinishedSpecialties().then((response) => {
  //         if (response === 'false') {
  //           this.props.history.push('/onboarding/specialties')
  //         } else {
  //           flaskFinishedProfile().then((response) => {
  //             if (response === 'false') {
  //               this.props.history.push('/onboarding/complete-profile')
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // }