import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image_path: String,
})

const Gift = mongoose.model('Gift', schema)

export default Gift
