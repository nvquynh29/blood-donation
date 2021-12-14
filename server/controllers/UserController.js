import bcrypt from 'bcrypt'
import randomString from '../helpers/randomString.helper.js'
import sendEmail from '../helpers/email.helper.js'
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

const addUser = async (req, res) => {
  try {
    const salt = 10
    const realPassword = randomString(12)
    const password = await bcrypt.hash(realPassword, salt)
    sendEmail(
      'vanphongltktv@gmail.com',
      req.body.email,
      'Lời mời vào hệ thống Giọt Hồng',
      `Bạn vừa được thêm vào hệ thống quản lý hiến máu nhân đạo Giọt Hồng (giothong.vn), đăng nhập với email hiện tại và mật khẩu: ${realPassword}`,
      `
        <h1>Bạn vừa được thêm vào hệ thống quản lý hiến máu nhân đạo Giọt Hồng (giothong.vn), đăng nhập với email hiện tại và mật khẩu: ${realPassword}</h1>
      `,
    )
    let newUser = new User({ ...req.body, password, role: 'admin' })
    newUser = await newUser.save()
    return res.status(200).json(newUser)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const UserController = {
  getUser,
  updateUser,
  deleteUser,
  addUser,
}
