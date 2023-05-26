import axios from 'axios'

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  })
}

const login = (email, password) => {
  return axios
    .post('/api/v1/auth/login', {
      email,
      password,
    })
    .then((response) => {
      return response.data
    })
}

const logout = () => {
  return axios.get('/api/v1/auth/logout').then((response) => {
    return response.data
  })
}

const authService = {
  register,
  login,
  logout,
}

export default authService
