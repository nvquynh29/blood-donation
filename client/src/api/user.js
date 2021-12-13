import instance from './axios'

export const getUser = () => instance.get('/user')
export const updateUser = (payload) => instance.put('/user', payload)
export const deleteUser = (id) => instance.delete(`/user/${id}`)