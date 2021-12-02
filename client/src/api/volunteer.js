import instance from './axios'

export const AddVolunteer = (arg) => instance.post('/volunteer', arg)
export const getVolunteers = () => instance.get('/volunteer/org')
export const updateVolunteer = (id, volunteer) => instance.put(`/volunteer/update/${id}`, volunteer)
export const deleteVolunteer = (id) => instance.delete(`/volunteer/${id}`)
export const getOrgRequests = () => instance.get('/volunteer/request')
export const markAsAccepted = (arg) => instance.put('/volunteer/markAsAccepted/list', arg)

export const getVolunteer = (id) => instance.get(`/volunteer/info/${id}`)