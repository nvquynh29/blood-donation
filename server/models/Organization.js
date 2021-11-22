import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: String,
  is_blood_bank: {
    type: String,
    required: true,
  },
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  list_blood_requests: [
    {
      amount: {
        type: Number,
        required: true,
      },
      register_date: {
        type: Date,
        required: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
})

const Organization = mongoose.model('Organization', schema)

export default Organization
