import api from './api.js'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user'

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  const { accessToken, user } = res.data
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { accessToken, user }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
}

export default { login, logout, getToken, getUser }
