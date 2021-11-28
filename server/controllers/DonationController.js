/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
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
        const { amount, time, gift_type, gift_id, is_done, event_id } = donation
        const donate = { eventAddress: event_id.address, amount, time, gift_type, gift_id, is_done }
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
  try {
    const newDonation = new Donation(req.body)
    await newDonation.save()
    return res.status(200).json(newDonation)
  } catch (error) {
    return res.status(500).json(error)
  }
}
