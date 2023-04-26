const valid = ({ fullname, username, email, password, cf_password }) => {
  const err = {}

  if (!fullname) {
    err.fullname = 'Please add your full name.'
  } else if (fullname.length > 25) {
    err.fullname = 'Full name is up to 25 characters long.'
  }

  if (!username) {
    err.username = 'Please add your user name.'
  } else if (username.toLowerCase().replace(/ /g, '').length > 25) {
    err.username = 'User name is up to 25 characters long.'
  }

  if (!email) {
    err.email = 'Please add your email.'
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect.'
  }

  if (!password) {
    err.password = 'Please add your password.'
  } else if (password.length < 6) {
    err.password = 'password must be at least 6 characters.'
  }

  if (password !== cf_password) {
    err.cf_password = 'Confirm password mismatched.'
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length
  }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export default valid
