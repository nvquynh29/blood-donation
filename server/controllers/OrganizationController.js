import Organization from '../models/Organization.js'

const createOrganization = async (req, res) => {
  const {
    name, address, description, isBloodBank,
  } = req.body
  let newOrganization = new Organization({
    name, address, description, is_blood_bank: isBloodBank,
  })
  try {
    newOrganization = await newOrganization.save()
    return res.status(200).json(newOrganization)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const OrganizationController = {
  createOrganization,
}
