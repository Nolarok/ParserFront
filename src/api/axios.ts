import axios from 'axios'
import { BASE_URL } from '@/constants'
import cookie from '@/api/cookie'
import { store } from '../../pages/_app'
import { logout } from '@/store/user/actions'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
  },
})

axiosInstance.interceptors.request.use(
  config => {
    const token = cookie.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log({error})
    return Promise.reject(error)
  }
)

