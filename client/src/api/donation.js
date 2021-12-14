import instance from './axios'

export const createDonation = (data) => instance.post('/donation', data)
export const updateDonationStatus = (id, status) => instance.patch(`/donation/${id}`, status)
export const updateDonation = (id, arg) => instance.put(`/donation/${id}`, arg)
export const findDonation = (data) => instance.post('/donation/find', data)
export const sendOTP = (phoneNumber) => instance.post('/otp', { phoneNumber })
export const verifyOTP = (phoneNumber, otp) => instance.post('/verify-otp', { phoneNumber, otp })
export const getEventDonation = (event_id) => instance.get(`/donation/event/${event_id}`)
export const getDonation = (id) => instance.get(`/donation/${id}`)
export const deleteDonation = (id) => instance.delete(`/donation/${id}`)
