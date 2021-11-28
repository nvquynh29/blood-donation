import axios from 'axios'
import instance from './axios'
import { API_URL } from './auth'

export const getAllOrganizations = () => instance.get(`${API_URL}/organization`)
export const getOrganization = (id) => {
    return axios.get(`${API_URL}/organization/${id}`)
}
export const getFile = (url) => axios.get(`${API_URL}/getFile`, url)