import instance from './axios'

export const createDonation = (data) => instance.post('/donation', data)
export const findDonation = (data) => instance.post('/donation/find', data)
export const sendOTP = (phoneNumber) => instance.post('/otp', { phoneNumber })
export const verifyOTP = (phoneNumber, otp) => instance.post('/verify-otp', { phoneNumber, otp })
