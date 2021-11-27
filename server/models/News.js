const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  html: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { collection: 'news', timestamps: true })

const News = mongoose.model('News', schema)

export default News
