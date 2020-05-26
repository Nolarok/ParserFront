import axios from 'axios'
import { BASE_URL } from '@/constants'
import cookie from '@/api/cookie'
// import { store } from '../../pages/_app'
// import { logout } from '@/store/authentication/actions'

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
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    // console.log({response}, response?.data?.created)
    // if (response?.data?.created) {
    //   response.data.created = new Date(response.data.created)
    // }
    //
    // if (response?.data?.updated) {
    //   response.data.updated = new Date(response.data.updated)
    // }

    return response
  },
  (error) => {
    if(error.response.status === 401) {
      // store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)
