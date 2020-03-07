import React from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Account from './components/Account/Account'
import Team from './components/Team/Team'
import ForgotPassword from './components/Account/Password/ForgotPassword'
import ConfirmCode from './components/Account/Password/ConfirmCode'
import ResetPassword from './components/Account/Password/ResetPassword'
import ActivateAccount from './components/Account/Activation/ActivateAccount'
import ResendLink from './components/Account/Activation/ResendLink'
import Welcome from './components/Welcome/Welcome'
import Specialties from './components/Onboarding/Specialties'
import CompleteProfile from './components/Onboarding/CompleteProfile'
import { getSession } from './components/Account/UserFunctions'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import LandingRoute from './components/Routing/LandingRoute'
import Profile from './components/Profile/Profile'
import Landing from './components/Landing/Landing'
// import SeekOrSupport from './components/SeekOrSupport'
import {withCookies} from 'react-cookie'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history' 
// import './App.css';
require('dotenv').config()



const trackingId = "UA-152041502-1" 
ReactGA.initialize(trackingId)

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }) //Update the user's current page
  ReactGA.pageview(location.pathname) //Record a pageview for the given page
})

function App() {
  return (
    <div>
      <Router history={history}>
        <Navigation /> 
        <LandingRoute exact path="/squish" component={Landing}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/team" component={Team} />
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/account" render={() => (getSession() ? (<Profile />) : (<Account/>))} />
        <Route exact path="/reset-link" component={ForgotPassword}/>
        <Route exact path="/codeconfirmation" component={ConfirmCode}/>
        <Route exact path="/resetpassword" component={ResetPassword}/>
        <Route exact path="/resend-link" component={ResendLink}/>
        <ProtectedRoute exact path="/account/activate" component={ActivateAccount}/>
        <ProtectedRoute exact path="/profile" component={Profile}/>
        <ProtectedRoute exact path="/welcome" component={Welcome}/>
        <ProtectedRoute exact path="/onboarding/specialties" component={Specialties} />
        <ProtectedRoute exact path="/onboarding/complete-profile" component={CompleteProfile} />
      </Router>
    </div>
  );
}

export default withCookies(App)

