import axios from 'axios'
import Cookies from 'universal-cookie'
import { env } from '../../next.config'

const cookies = new Cookies()
const getHeader = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (cookies.get('accessToken')) {
    headers = { ...headers, 'X-ACCESS-TOKEN': cookies.get('accessToken') }
  }
  if (cookies.get('refreshToken')) {
    headers = { ...headers, 'X-REFRESH-TOKEN': cookies.get('refreshToken') }
  }
  return headers
}

const instance = axios.create({
  baseURL: env.API_URL,
  headers: getHeader(),
})
// const instance = axios.create({
//   baseURL: env.API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-ACCESS-TOKEN': cookies.get('accessToken'),
//     'X-REFRESH-TOKEN': cookies.get('refreshToken'),
//   },
// })

const refreshToken = async () => {
  return instance.get('/refresh-token').data
}

instance.interceptors.response.use(
  async (response) => {
    const config = response.config
    if (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refresh-token') >= 0) {
      return response
    }
    const status = response.status
    if (status && status === 401) {
      if (msg && msg == 'jwt expired') {
        const { accessToken } = await refreshToken()
        if (accessToken) {
          console.log('Da lay lai access Token thanh cong')
          cookies.set('accessToken', accessToken)
          // writeCookies({ accessToken })
          return instance(config)
        }
      }
    }
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
