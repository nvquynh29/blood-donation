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
    const data = { name, email }
    if (currentPassword && newPassword) {
      const isValidUser = bcrypt.compareSync(currentPassword, user.password)
      if (isValidUser) {
        const password = await bcrypt.hash(newPassword, salt)
        data.password = password
      } else {
        return res.status(403).json({ msg: 'password incorrect' })
      }
    }
    const response = await User.findOneAndUpdate({ _id }, data, { new: true })
    return res.status(200).json({
      name: response.name,
      email: response.email,
      role: response.role,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const UserController = {
  getUser,
  updateUser,
  deleteUser,
}
