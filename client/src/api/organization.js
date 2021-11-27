import instance from './axios'
// import axios from 'axios'
import { API_URL } from './auth'

export const getAllOrganizations = () => instance.get(`${API_URL}/organization`)
export const getFile = (url) => instance.get(`${API_URL}/getFile`, url)