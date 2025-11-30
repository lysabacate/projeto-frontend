import axios from 'axios'
import { getToken, logout } from './authService'

// Choose baseURL carefully to avoid mixed content in secure contexts (https pages)
const envApi = import.meta.env.VITE_API_URL
let baseUrl = '/api'
if (envApi) {
  try {
    const url = new URL(envApi)
    if (typeof window !== 'undefined') {
      // If the protocol matches (both https or both http), we can use explicit API URL
      if (window.location.protocol === `${url.protocol}`) baseUrl = envApi
      else console.warn('Ignoring VITE_API_URL due to protocol mismatch with page:', envApi)
    } else {
      // no window (e.g., SSR), default to envApi
      baseUrl = envApi
    }
  } catch (err) {
    // If envApi is not a valid URL, use the raw value or '/api'
    baseUrl = envApi || '/api'
  }
}

const api = axios.create({ baseURL: baseUrl })

console.log('API baseURL:', api.defaults.baseURL, 'VITE_API_URL=', import.meta.env.VITE_API_URL)

api.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  r => r,
  err => {
    console.error('API response error:', err?.response?.status, err?.message)
    if (err.response && err.response.status === 401) {
      logout()
      // optional: redirect to login (views or router must be used in UI)
    }
    return Promise.reject(err)
  }
)

export default api