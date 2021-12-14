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
    type: Boolean,
    required: true,
    default: false,
  },
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Organization = mongoose.model('Organization', schema)

export default Organization
