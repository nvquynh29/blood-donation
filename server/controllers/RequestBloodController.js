import mongoose from 'mongoose'
/* eslint-disable camelcase */
import RequestBlood from '../models/RequestBlood.js'
import User from '../models/User.js'

const addRequestBlood = async (req, res) => {
  try {
    let newRequestBlood = new RequestBlood(req.body)
    newRequestBlood = await newRequestBlood.save()
    return res.status(200).json(newRequestBlood)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getPendingRequests = async (_, res) => {
  try {
    const requests = await RequestBlood.find({ accepted: false, organization_id: null })
    return res.status(200).json(requests)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAcceptedRequests = async (req, res) => {
  try {
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const requests = await RequestBlood.find({ accepted: true, organization_id })
    return res.status(200).json(requests)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const markAsAccepted = async (req, res) => {
  try {
    const { listID } = req.body
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const response = await RequestBlood.updateMany(
      {
        _id: {
          $in: listID,
        },
      },
      {
        $set: {
          accepted: true,
          organization_id: mongoose.Types.ObjectId(organization_id),
        },
      },
    )
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params
    await RequestBlood.findOneAndDelete({ _id: id })
    return res.status(200).json({ message: 'Deleted' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const response = await RequestBlood.findOneAndUpdate(
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

const getRequestBlood = async (req, res) => {
  try {
    const request = await RequestBlood.findById(req.params.id)
    return res.status(200).json(request)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateRequestBlood = async (req, res) => {
  try {
    const { id } = req.params
    const response = await RequestBlood.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
    )
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const RequestBloodController = {
  addRequestBlood,
  getAcceptedRequests,
  getPendingRequests,
  markAsAccepted,
  deleteRequest,
  updateRequestStatus,
  getRequestBlood,
  updateRequestBlood,
}
