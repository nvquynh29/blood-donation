const mongoose = require('mongoose')

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
    admin: Array,
    list_blood_requests: Array,
})

const Organization = mongoose.model('Organization', schema)

export default Organization