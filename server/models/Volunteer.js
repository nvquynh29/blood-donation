import mongoose from 'mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: String,
  gender: {
    type: String,
    required: true,
  },
})

const Volunteer = mongoose.model('Volunteer', schema)

export default Volunteer
