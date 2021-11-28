import instance from './axios'

export const API_URL = 'http://localhost:5000'
export const signup = (credential) => instance.post(`${API_URL}/signup`, credential)
export const login = (credential) => instance.post(`${API_URL}/login`, credential)
