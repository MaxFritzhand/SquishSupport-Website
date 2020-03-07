import axios from 'axios'

const url = process.env.REACT_APP_BACKEND


export const flaskFinishedOnboarding = () => {
  return axios
  .post(url + '/onboarding-status', {
    email: localStorage.email
  })
  .then(response => {
    if (response.data.onboarding_status === 'true') {
      return response.data.onboarding_status
    } else {
      return  response.data.onboarding_status
    }
  }).catch(err => {
    console.log(err)
  })
}

export const flaskFinishedSpecialties = () => {
  return axios
  .post(url +'/specialties-status', {
    email: localStorage.email
  })
  .then(response => {
    if (response.data.specialties_status === 'true') {
      return  response.data.specialties_status
    } else {
      return response.data.specialties_status
    }
  }).catch(err => {
    console.log(err)
  })
}


export const flaskFinishedProfile = () => {
  return axios
  .post(url +'/profile-status', {
    email: localStorage.email
  })
  .then(response => {
    if (response.data.profile_status ===  'true') {
      return response.data.profile_status
    } else {
      return response.data.profile_status
    }
  }).catch(err => {
    console.log(err)
  })
}


