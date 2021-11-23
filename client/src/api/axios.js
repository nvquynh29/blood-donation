import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': cookies.get('accessToken'),
    'X-REFRESH-TOKEN': cookies.get('refreshToken'),
  },
})

const refreshToken = async () => {
  return instance.get('/refresh-token').data
}

instance.interceptors.response.use(
  async (response) => {
    const config = response.config
    console.log(response)
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
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
