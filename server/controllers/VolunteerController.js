/* eslint-disable camelcase */
import User from '../models/User.js'
import Volunteer from '../models/Volunteer.js'
import Event from '../models/Event.js'

const addVolunteer = async (req, res) => {
  try {
    let newVolunteer = new Volunteer({
      name: req.body.name,
      phone: req.body.phone_number,
      date_of_birth: req.body.birthday,
      address: req.body.address,
      email: req.body.email,
      organization_id: req.body.organization_id,
      gender: req.body.gender,
      accepted: req.body.accepted ? req.body.accepted : false,
    })
    newVolunteer = await newVolunteer.save()
    return res.status(200).json(newVolunteer)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const addVolunteerAdmin = async (req, res) => {
  try {
    if (req.user && req.body.organization_id === 'mine') {
      const { _id } = req.user
      const user = await User.findOne({ _id })
      req.body.organization_id = user.organization_id
    }
    let newVolunteer = new Volunteer({
      name: req.body.name,
      phone: req.body.phone_number,
      date_of_birth: req.body.birthday,
      address: req.body.address,
      email: req.body.email,
      organization_id: req.body.organization_id,
      gender: req.body.gender,
      accepted: req.body.accepted ? req.body.accepted : false,
    })
    newVolunteer = await newVolunteer.save()
    return res.status(200).json(newVolunteer)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAllVolunteers = async (_, res) => {
  try {
    const volunteers = await Volunteer.find()
    return res.status(200).json(volunteers)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params
    await Volunteer.findOneAndDelete({ _id: id })
    await Event.updateMany(
      {},
      { $pull: { volunteers: id } },
    )
    return res.status(200).json({})
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Volunteer.findOneAndUpdate({ _id: id }, req.body, { new: true })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getOrgVolunteers = async (req, res) => {
  try {
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const volunteers = await Volunteer.find({ organization_id: organization_id, accepted: true })
    return res.status(200).json(volunteers)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getOrgRequests = async (req, res) => {
  try {
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const volunteerRequest = await Volunteer.find({
      organization_id: organization_id,
      accepted: false,
    })
    console.log(req.user)
    return res.status(200).json(volunteerRequest)
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getVolunteer = async (req, res) => {
  try {
    const { id } = req.params
    const volunteer = await Volunteer.findById(id)
    return res.status(200).json(volunteer)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const markAsAccepted = async (req, res) => {
  try {
    const { listID } = req.body
    const response = await Volunteer.updateMany(
      {
        _id: {
          $in: listID,
        },
      },
      {
        $set: {
          accepted: true,
        },
      },
    )
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const VolunteerController = {
  addVolunteer,
  getAllVolunteers,
  updateVolunteer,
  deleteVolunteer,
  getOrgVolunteers,
  getOrgRequests,
  getVolunteer,
  markAsAccepted,
  addVolunteerAdmin,
}
