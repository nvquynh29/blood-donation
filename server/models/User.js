import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
    default: '',
  },
  refreshToken: {
    type: String,
    required: false,
    default: null,
  },
})

const User = mongoose.model('User', schema)
export default User
