import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    // step 1
    address_1: {
      type: String,
      required: true,
    },
    address_2: {
      required: true,
      type: String,
    },
    city_1: {
      type: String,
      required: true,
    },
    city_2: {
      required: true,
      type: String,
    },
    class: String,
    district_1: {
      required: true,
      type: String,
    },
    district_2: {
      required: true,
      type: String,
    },
    foreigner: {
      type: Boolean,
      default: false,
    },
    fulladdress_1: String,
    fulladdress_2: String,
    email: {
      required: true,
      type: String,
    },
    major: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    phone: {
      required: true,
      type: String,
    },
    gender: {
      required: true,
      type: String,
    },
    uid_place: {
      required: true,
      type: String,
    },
    user_role_uid: {
      required: true,
      type: String,
    },
    citizenID: {
      required: true,
      type: String,
    },
    ward_1: {
      required: true,
      type: String,
    },
    ward_2: {
      required: true,
      type: String,
    },
    work_place: String,
    // step 2
    amount: {
      type: Number,
      required: true,
    },
    selectGift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift',
    },
    time: {
      type: String,
      required: true,
    },
    // step 3
    list_answer: {
      type: Object,
      required: true,
    },
    // other info
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      default: null,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
    blood_type: {
      type: String,
      default: null,
    },
    done_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

const Donation = mongoose.model('Donation', schema)
export default Donation
