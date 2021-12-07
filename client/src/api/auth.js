import instance from './axios'

export const signup = (credential) => instance.post('/signup', credential)
export const login = (credential) => instance.post('/login', credential)
export const refreshToken = () => instance.get('/refresh-token')