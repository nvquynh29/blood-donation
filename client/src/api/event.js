import instance from './axios'
import { API_URL } from './auth'

export const getEvent = (limit) => instance.get(`${API_URL}/event?limit=${limit}`)
export const getAllEvent = () => instance.get(`${API_URL}/event`)

 