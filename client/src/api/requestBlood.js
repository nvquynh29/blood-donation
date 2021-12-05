import instance from './axios'

export const addRequestBlood = (arg) => instance.post('/request-blood', arg)
export const getRequests = () => instance.get('/request-blood')
export const markAsAccepted = (payload) => instance.put('/request-blood/markAsAccepted/list', { listID: payload })
