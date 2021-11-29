import instance from './axios'

export const addRequestBlood = (arg) => instance.post('/requestBlood', arg)

