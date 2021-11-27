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
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  donation_books: [
    {
      amount: {
        type: Number,
        required: true,
      },
      gift_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift',
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      updated_at: {
        type: Date,
        default: Date.now(),
      },
      is_done: {
        type: Boolean,
        required: true,
      },
    },
  ],
})

const Event = mongoose.model('Event', schema)

export default Event
