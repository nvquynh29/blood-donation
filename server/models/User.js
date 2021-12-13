import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
    default: null,
  },
  phone: {
    type: String,
    required: true,
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
})

const User = mongoose.model('User', schema)
export default User
