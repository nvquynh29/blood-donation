import instance from './axios'

export const AddVolunteer = (arg) => instance.post('/volunteer', arg)
export const getVolunteers = () => instance.get('/volunteer/org')
export const updateVolunteer = (id, volunteer) => instance.put(`/volunteer/${id}`, volunteer)
export const deleteVolunteer = (id) => instance.delete(`/volunteer/${id}`)