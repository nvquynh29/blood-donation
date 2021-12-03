import instance from './axios'

export const getEvent = (limit) => instance.get(`/event?limit=${limit}`)
export const getAllEvent = () => instance.get(`/event`)
export const updateEvent = (id, arg) => instance.put(`/event/${id}`, arg)
export const deleteEvent = (id) => instance.delete(`/event/${id}`)
export const addEvent = (arg) => instance.post('/event', arg)
export const getEventDetail = (id) => instance.get(`/event/detail/${id}`)

 