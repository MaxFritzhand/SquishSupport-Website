import axios from 'axios'

const url = process.env.REACT_APP_BACKEND


export const register = newUser => {
  return axios
  .post(url + "/users/register", {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password
  })
  .then(response => {
    if (response.data.invalidEmail) {
      return response.data
    } else {
      localStorage.setItem('usertoken', response.data.token)
      localStorage.setItem('email', response.data.email)
      return response.data
    }
  })
}

export const preRegister = (information) => {
  return axios 
  .post(url + '/preregister', {
    first_name: information.first_name,
    last_name: information.last_name,
    email: information.email,
    seeker: information.seeker,
    supporter: information.supporter,
    ambassador: information.ambassador,
  }).then(response => {
    if (response.data.success) {
      return response.data
    }
  })
}


export const login = user => {
  return axios 
  .post(url + '/users/login', {
    email: user.email,
    password: user.password,
  })
  .then(response => {
    if (response.data.invalidPass) {
      return response.data
    } else if (response.data.invalidEmail) {
      return response.data
    } else {
      localStorage.setItem('usertoken', response.data.token)
      localStorage.setItem('email', response.data.email)
      return response.data
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const changePassword = user => {
  return axios
  .post(url + '/users/changepassword', {
    email: user.email,
    password: user.password
  })
  .then(response => {
    if (response.data.token) {
      localStorage.setItem('usertoken', response.data.token)
      localStorage.setItem('email', response.data.email)
      return response.data
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const activationLogin = user => {
  return axios 
  .post(url + '/users/activation-login', {
    email: user.email,
    code: user.code
  })
  .then(response => {
    if (response.data.invalidEmail) {
      return response.data
    } else {
      localStorage.setItem('usertoken', response.data.token)
      localStorage.setItem('email', response.data.email)
      return response.data
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const emailActivationCode = user => {
  return axios
  .post(url + '/email-activation-key', {
    email: user.email,
    code: user.activationCode,
    path: user.path
  })
  .then(response => {
    localStorage.setItem('key', response.data.key)
    localStorage.setItem('email', response.data.email)
  })
  .catch(err => {
    console.log(err)
  })
}

export const resendCode = user => {
  return axios
  .post(url + '/resendcode', {
    email: user.email,
    code: user.activationCode,
    link: user.path
  })
  .then(response => {
    localStorage.setItem('email', response.data.email)
    return response.data.status
  })
  .catch(err => {
    console.log(err)
  })
}

export const emailConfirmationCode = user => {
  return axios
  .post(url + '/confirmationcode', {
    email: user.email,
    code: user.confirmationCode,
    link: user.path
  })
  .then(response => {
    if (response.data.status) {
      return response.data.status
    } else if (response.data.error) {
      return response.data.error
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const activate = user => {
  return axios
  .post(url + '/users/activate', {
    email: user.email,
  })
  .then(response => {
    if (response.data.error) {
      return response.data
    }
    else {
      return response.data
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const getUser = () => {
  return axios
  .post(url + '/users/getuser', {
    email: localStorage.email
  })
  .then(response => {
    if (response.data.error) {
      return response.data.error
    } else {
       ;
      const specialtiesCount = response.data.specialties.length
      localStorage.setItem('name', response.data.name)
      localStorage.setItem('experience', response.data.experience)
      localStorage.setItem('specialties', response.data.specialties)
      localStorage.setItem('specialtiesCount', specialtiesCount)
      localStorage.setItem('city', response.data.city)
      localStorage.setItem('state', response.data.state)
      localStorage.setItem('university', response.data.university)
      return response
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export const contactUs = (info) => {
  return axios 
  .post(url + '/contact', {
    name: info.name,
    email: info.email,
    message: info.message
  })
  .then(response => {
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const getSession = () => {
  const jwt = localStorage.usertoken 
  try {
    if (jwt) {
      return jwt 
    }
   } catch (error) {
     console.log(error)
   }
   return jwt 
}


export const checkFirstVisit = () => {
  const hasVisited = localStorage.getItem('hasVisited')
  if (hasVisited === null) {
    return true
  } else if (hasVisited === true) {
    return false
  }
}

export const setSpecialties = specialties => {
  return axios 
  .post(url + '/users/specialty', {
    specialties: specialties,
    email: localStorage.email
  })
  .then(response => {
    if (response) {
      return response
    }
  }) 
  .catch(err => {
    console.log(err)
  })
}

export const completeProfile = profileInfo => {
  return axios 
  .post(url + '/users/complete-profile', {
    university: profileInfo.university,
    phone: profileInfo.phone,
    experience: profileInfo.experience,
    zipcode: profileInfo.zipcode,
    email: localStorage.email,
    city: profileInfo.city,
    state: profileInfo.state
  })
  .then(response => {
    if (response) {
      return response
    }
  }) 
  .catch(err => {
    console.log(err)
  })
}

export const formatPhone = (number) => {
  let cleaned = ('' + number).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

export const checkActivatedUser = () => {
  return axios
  .post(url + '/users/check-activation', {
    email: localStorage.email
  })
  .then(response => {
    if (response.data.activated === 'true') {
      return  response.data.activated
    } else {
      return response.data.activated
    }
  }).catch(err => {
    console.log(err)
  })
}

// In Profile bio, add event handler
{/* <div id="user-bio">I specialize in treating {specialties === null ? null : this.formatSpecialties(specialties)}. I also bring forth {experience} years of cumulative experience.</div> */}

// formatSpecialties = (specialties) => {
//   let formatted 
//   if (specialties === undefined) {
//     formatted = null
//   } else {
//     formatted = specialties.split(',').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1))
//     if (formatted.length === 1) {
//       formatted.join()
//     } else if (formatted.length === 2) {
//       formatted = formatted.join(" and ")
//     } else {
//       formatted = formatted.join(', ')
//       formatted = formatted.replace(/,(?=[^,]*$)/, ' and')
//     }
//   }
//   return formatted;
// }



// export const setWidgets = widgets => {
//   return axios 
//   .post(url + '/users/widget', {
//     widgets: widgets,
//     email: localStorage.email
//   })
//   .then(response => {
//     if (response.data.widgets) {
//       return response.data.widgets
//     }
//   }) 
//   .catch(err => {
//     console.log(err)
//   })
// }



// export const getSession = () => {
//   const jwt = Cookies.get('__session')
//   let session
//    ;
//   try {
//     if (jwt) {
//       const base64Url = jwt.split('.')[1]
//       const base64 = base64Url.replace('-', '+').replace('_', '/')
//       session = JSON.parse(window.atob(base64))
//     }
//    } catch (error) {
//      console.log(error)
//    }
//    return session 
// }