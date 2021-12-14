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
    unique: false,
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
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
})

const Volunteer = mongoose.model('Volunteer', schema)

export default Volunteer
