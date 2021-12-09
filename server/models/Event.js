import mongoose from 'mongoose'

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
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volunteer',
      required: true,
    },
  ],
  donation_books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
  ],
})

const Event = mongoose.model('Event', schema)

export default Event
