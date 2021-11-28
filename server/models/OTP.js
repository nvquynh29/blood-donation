import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  expired: {
    type: Date,
    required: true,
  },
})

const OTP = mongoose.model('OTP', schema)

export default OTP
