import instance from './axios'

export const getAllGifts = async () => instance.get('/gift')
