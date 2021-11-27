const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  image_path: {
    type: String,
    required: true,
  },
}, { collection: 'galleries', timestamps: true })

const Gallery = mongoose.model('Gallery', schema)

export default Gallery
