import twilio from 'twilio'
import dotenv from 'dotenv'
import OTP from '../models/OTP.js'

dotenv.config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = twilio(accountSid, authToken)

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const getInternationalPhone = (phoneNumber) => `+84${phoneNumber.slice(1)}`
// eslint-disable-next-line no-return-await
const sendSMS = async (phoneNumber, message) =>
  await twilioClient.messages.create({
    messagingServiceSid: messagingServiceSid,
    to: getInternationalPhone(phoneNumber),
    body: message,
  })

export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body
  const validTime = 120000 // 2 minutes
  const code = getRandomNumberBetween(100000, 999999)
  const message = `Ma xac thuc GIOT HONG cua ban la: ${code}. Ma xac thuc nay co hieu luc trong vong 2 phut.`
  try {
    await sendSMS(phoneNumber, message)
    const newOTP = new OTP({
      phone: getInternationalPhone(phoneNumber),
      otp: code,
      expired: new Date(new Date().getTime() + validTime),
    })
    await newOTP.save()
    return res.status(200).send('OTP sent!')
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body
  const now = new Date()
  if (phoneNumber && otp) {
    try {
      const otps = await OTP.find({ phone: getInternationalPhone(phoneNumber), verified: false })
        .sort({ expired: -1 })
        .exec()
      const realOTP = otps[0]
      if (otp === realOTP.otp && now < new Date(realOTP.expired)) {
        OTP.updateOne({ otp: realOTP.otp, verified: false }, { verified: true })
        return res.status(200).json({ valid: true })
      }
      return res.status(200).json({ valid: false })
    } catch (error) {
      return res.status(500).json({ valid: false, error })
    }
  }
  return res.status(409).json({ msg: 'All input is required' })
}
