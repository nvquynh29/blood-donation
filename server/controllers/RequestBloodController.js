import RequestBlood from '../models/RequestBlood.js'

const addRequestBlood = async (req, res) => {
  try {
    let newRequestBlood = new RequestBlood(req.body)
    newRequestBlood = await newRequestBlood.save()
    return res.status(200).json(newRequestBlood)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const RequestBloodController = {
  addRequestBlood,
}
