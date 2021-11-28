import instance from './axios'
import { API_URL } from './auth'

export const AddVolunteer = (arg) => instance.post(`${API_URL}/volunteer`, arg)