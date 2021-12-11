/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import moment from 'moment'
import Donation from '../models/Donation.js'

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
    console.log(donations)
    if (donations.length) {
      const { _id, name, citizenID, phone, gender, address, date_of_birth, email, blood_type } = donations[0]
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
        const { amount, created_at, gift_type, gift_id, is_done, event_id } = donation
        const donate = { eventAddress: event_id.address,
          amount,
          time: created_at,
          gift_type,
          gift_id,
          is_done }
        history.push(donate)
      })
      const count = history.length
      const totalAmount = history.reduce((accumulator, donate) => accumulator + donate.amount, 0)
      return res.status(200).json({ ...info, history: history, count, totalAmount })
    }
    return res.status(200).json(donations)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const createDonation = async (req, res) => {
  const { date_of_birth } = req.body
  try {
    const newDonation = new Donation({
      ...req.body[0].step1,
      ...req.body[1].step2,
      list_answer: req.body[2].step3,
      event_id: req.body.event_id,
      date_of_birth: moment(date_of_birth).startOf('day').utcOffset('+00:00', true),
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

export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
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
