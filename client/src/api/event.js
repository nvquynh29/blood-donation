import instance from './axios'

export const getEvent = (limit) => instance.get(`/event?limit=${limit}`)
export const getAllEvent = () => instance.get(`/event`)

 