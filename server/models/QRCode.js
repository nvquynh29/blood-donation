import mongoose from 'mongoose'

const schema = mongoose.Schema({
  citizen_id: {
    type: String,
    required: true,
    unique: true,
  },
  qr_code: {
    type: String,
    required: true,
  },
})

const QRCode = mongoose.model('QRCode', schema, 'qrcodes')

export default QRCode
