const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    html: {
        type: String,
        required: true,
    },
    writer: mongoose.Schema.Types.ObjectId,
}, { collection: 'news', timestamps: true})

const News = mongoose.model('News', schema)

export default News