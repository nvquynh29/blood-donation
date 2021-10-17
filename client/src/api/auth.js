import axios from 'axios'

const API_URL = 'http://localhost:5000'
export const signup = (credential) => axios.post(`${API_URL}/signup`, credential)
export const login = (credential) => axios.post(`${API_URL}/login`, credential)
