import Gift from '../models/Gift.js'

const getAllGift = async (req, res) => {
  try {
    const gifts = await Gift.find({})
    return res.status(200).json(gifts)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const GiftController = {
  getAllGift,
}
