const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image_path: String,
  level: {
    type: String,
    required: true,
  },
})

const Gift = mongoose.model('Gift', schema)

export default Gift
