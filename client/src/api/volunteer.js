import instance from './axios'

export const AddVolunteer = (arg) => instance.post('/volunteer', arg)