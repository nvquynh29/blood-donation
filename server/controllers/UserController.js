import bcrypt from 'bcrypt'
import User from '../models/User.js'

const getUser = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findOne({ _id }, {
      name: 1,
      email: 1,
      role: 1,
    }).exec()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  const salt = 10
  try {
    const { _id } = req.user
    const {
      name, email, currentPassword, newPassword,
    } = req.body
    const user = await User.findOne({ _id })
    let isValidUser
    if (typeof currentPassword !== 'undefined') {
      isValidUser = bcrypt.compareSync(currentPassword, user.password)
    }
    if (isValidUser || typeof currentPassword === 'undefined') {
      const password = (isValidUser)
        ? await bcrypt.hash(newPassword, salt) : user.password
      const response = await User.findOneAndUpdate(
        { _id },
        { name, email, password },
        { new: true },
      )
      return res.status(200).json({
        name: response.name,
        email: response.email,
        role: response.role,
      })
    }
    return res.status(403).json({ msg: 'password incorrect' })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const UserController = {
  getUser,
  updateUser,
}
