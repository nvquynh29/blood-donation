import bcrypt from 'bcrypt'
import User from '../models/User.js'

const getUser = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findOne({ _id }, {
      name: 1,
      email: 1,
    }).exec()
    console.log(user)
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
    const isValidUser = bcrypt.compareSync(currentPassword, user.password)
    if (isValidUser) {
      const password = await bcrypt.hash(newPassword, salt)
      const response = await User.findOneAndUpdate(
        { _id },
        { name, email, password },
        { new: true },
      )
      return res.status(200).json({ name: response.name, email: response.email })
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
