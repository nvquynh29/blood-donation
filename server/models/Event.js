const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    // number of days
    duration: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    organization_id: mongoose.Schema.Types.ObjectId,
    volunteers: Array,
    donation_books: Array
})

const Event = mongoose.model('Event', schema)

export default Event