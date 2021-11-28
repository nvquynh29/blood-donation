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
  img_path: String,
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
      subscriber_info: {
        name: {
          type: String,
          required: true,
        },
        identity_id: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },

      },
      blood_type: {
        type: String,
        required: true,
      },
    },
  ],
})

const Organization = mongoose.model('Organization', schema)

export default Organization
