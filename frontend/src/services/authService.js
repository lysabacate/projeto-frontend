import api from './api.js'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user'

export async function login(email, password) {
  try {
    const res = await api.post('/auth/login', { email, password })
    console.log('authService.login response:', res.data)
    const { accessToken, user } = res.data
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return { accessToken, user }
  } catch (err) {
    console.error('Login failed in authService:', err?.response?.data || err.message)
    throw err
  }
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
