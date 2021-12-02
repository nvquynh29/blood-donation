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
  citizenID: String,
  phone: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
  },
  blood_type: String,
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', schema)
export default User
