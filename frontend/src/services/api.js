import axios from 'axios'
import { getToken, logout } from './authService'

const api = axios.create({
  // Frontend default to proxy '/api' (vite proxy) or use VITE_API_URL when set
  baseURL: import.meta.env.VITE_API_URL || '/api'
})

api.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) {
      logout()
      // optional: redirect to login (views or router must be used in UI)
    }
    return Promise.reject(err)
  }
)

export default api