import path from 'path'
import mongodb from 'mongodb'
import Organization from '../models/Organization.js'
import User from '../models/User.js'

const createOrganization = async (req, res) => {
  const {
    name, address, description, isBloodBank,
  } = req.body
  console.log(req.body)
  console.log(req.file)
  let newOrganization = new Organization({
    name,
    address,
    description,
    is_blood_bank: isBloodBank,
    img_path: req.file.path,
  })
  try {
    newOrganization = await newOrganization.save()
    return res.status(200).json(newOrganization)
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({}, {
      admin: 0,
      list_blood_requests: 0,
      volunteers: 0,
    })
    return res.status(200).json(organizations)
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id, {
      admin: 0,
      list_blood_requests: 0,
      volunteers: 0,
    })
    return res.status(200).json(organization)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getAllAdmins = async (req, res) => {
  try {
    const { _id } = req.user
    const { organization_id } = await User.findOne({ _id })
    const admins = await User.find({
      organization_id: organization_id.toString(),
      role: {
        $in: ['admin', 'ADMIN', 'Admin'],
      },
      _id: {
        $ne: _id,
      },
    })
    return res.status(200).json(admins)
  } catch (error) {
    return res.status(500).json(error)
  }
}
const getImage = async (req, res) => res.sendFile(path.join(path.resolve(), req.query.img_path))
export const OrganizationController = {
  createOrganization,
  getAllOrganizations,
  getImage,
  getOrganization,
  getAllAdmins,
}
