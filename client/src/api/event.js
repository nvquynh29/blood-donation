import instance from './axios'
import { API_URL } from './auth'

export const getAllEvent = () => instance.get(`${API_URL}/event`)

 