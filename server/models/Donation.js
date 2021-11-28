import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  citizenID: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  blood_type: {
    type: String,
    required: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  gift_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  is_done: {
    type: Boolean,
    default: true,
  },
})

const Donation = mongoose.model('Donation', schema)
export default Donation
