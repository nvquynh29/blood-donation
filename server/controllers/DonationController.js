/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import moment from 'moment'
import dotenv from 'dotenv'
import Donation from '../models/Donation.js'
import QRCode from '../models/QRCode.js'
import qrHelper from '../helpers/qr.helper.js'

dotenv.config()

const formatDonations = async (donations) => {
  const {
    _id,
    name,
    citizenID,
    phone,
    gender,
    city_1,
    district_1,
    ward_1,
    date_of_birth,
    email,
    blood_type,
  } = donations[0]
  const address = [ward_1, district_1, city_1].join(', ')
  const info = {
    _id,
    name,
    citizenID,
    phone,
    gender,
    address,
    date_of_birth,
    email,
    blood_type,
  }
  const history = []
  donations.forEach((donation) => {
    const { amount, done_date, gift_type, gift_id, is_done, event_id } = donation
    if (is_done) {
      const donate = {
        eventAddress: event_id.address,
        amount,
        time: done_date,
        gift_type,
        gift_id,
        is_done,
      }
      history.push(donate)
    }
  })
  const count = history.length
  const totalAmount = history.reduce((accumulator, donate) => accumulator + donate.amount, 0)
  try {
    const { qr_code } = await QRCode.findOne({ citizen_id: citizenID })
    const donateHistory = { ...info, history: history, count, totalAmount, qr_code }
    return donateHistory
  } catch (error) {
    throw new Error(error)
  }
}

export const findDonation = async (req, res) => {
  try {
    const filter = req.body
    filter.date_of_birth = new Date(req.body.date_of_birth)
    const donations = await Donation.find(filter)
      .populate('event_id', { address: 1 })
      .sort({
        time: 1,
      })
      .exec()
    if (donations.length) {
      const donateHistory = await formatDonations(donations)
      return res.status(200).json(donateHistory)
    }
    return res.status(200).json(donations)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const createDonation = async (req, res) => {
  const { date_of_birth } = req.body
  let { done_date } = req.body[1].step2
  done_date = moment(done_date, 'DD/MM/YYYY')
  try {
    const newDonation = new Donation({
      ...req.body[0].step1,
      ...req.body[1].step2,
      list_answer: req.body[2].step3,
      event_id: req.body.event_id,
      date_of_birth: moment(date_of_birth).startOf('day').utcOffset('+00:00', true),
      done_date: done_date.format('YYYY-MM-DD'),
    })
    await newDonation.save()
    return res.status(200).json(newDonation)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getEventDonation = async (req, res) => {
  try {
    const donations = await Donation.find({ event_id: req.params.event_id })
    return res.status(200).json(donations)
  } catch (e) {
    return res.status(500).json(e)
  }
}

export const deleteDonation = async (req, res) => {
  try {
    const response = await Donation.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json(e)
  }
}

const generateQR = async (id) => {
  const { citizenID } = await Donation.findOne({ _id: id })
  const record = await QRCode.findOne({ citizen_id: citizenID })
  if (!record) {
    const url = `${process.env.APP_URL}/donate-history/${citizenID}`
    const qrCode = await qrHelper.generateQRCode(url)
    const newQRCode = new QRCode({ citizen_id: citizenID, qr_code: qrCode })
    await newQRCode.save()
  }
}

export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    if (status) {
      await generateQR(id)
    }
    const response = await Donation.findOneAndUpdate(
      { _id: id },
      { is_done: status },
      { new: true },
    )
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const donateHistory = async (req, res) => {
  try {
    const { citizen_id } = req.params
    const donations = await Donation.find({ citizenID: citizen_id })
      .populate('event_id', { address: 1 })
      .sort({
        time: 1,
      })
      .exec()
    if (donations.length) {
      const response = await formatDonations(donations)
      return res.status(200).json(response)
    }
    return res.status(200).json(donations)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getDonation = async (req, res) => {
  try {
    const response = await Donation.findOne({ _id: req.params.id })
    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json(e)
  }
}

export const updateDonation = async (req, res) => {
  try {
    let done_date
    if (req.body.done_date) {
      done_date = req.body.done_date
      done_date = moment(done_date, 'DD/MM/YYYY')
    }
    const { id } = req.params
    const updateInput = (done_date === undefined)
      ? { ...req.body } : { ...req.body, done_date: done_date.format('YYYY-MM-DD') }
    const response = await Donation.findOneAndUpdate(
      { _id: id },
      updateInput,
      { new: true },
    )
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
