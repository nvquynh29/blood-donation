import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import { jwtHelper } from '../helpers/jwt.helper.js'
import User from '../models/User.js'

const updateRefreshToken = (id, refreshToken) => {
  User.findByIdAndUpdate(id, { refreshToken }, { new: true }, (err, _) => {
    if (err) {
      console.error(err)
    }
  })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.sendStatus(401)
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (passwordMatch) {
      const accessToken = await jwtHelper.generateToken(
        { _id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        '1h',
      )
      const refreshToken = await jwtHelper.generateToken(
        { _id: user._id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        '30d',
      )
      updateRefreshToken(user._id, refreshToken)
      return res.status(200).json({ accessToken, refreshToken, role: user.role })
    }
    return res.status(401).json('Password incorrect')
  } catch (error) {
    return res.status(500).json(error)
  }
}

const signup = async (req, res) => {
  const salt = 10
  try {
    const {
      name, email, password, phone, role,
    } = req.body
    // validate input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const validInput = email && password && name && phone && role
    if (!validInput) {
      res.status(400).send('All input is required')
    }
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }

    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: role,
    })
    await newUser.save()
    return res.status(200).json({ message: 'Account created' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.headers['x-refresh-token'] || req.body.refreshToken
  if (!refreshTokenFromClient) {
    return res.status(403).json({ message: 'No token provided' })
  }
  const user = await User.findOne({ refreshToken: refreshTokenFromClient })
  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
  try {
    jwt.verify(refreshTokenFromClient, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = await jwtHelper.generateToken(
      { _id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      '1h',
    )
    return res.status(200).json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(403).json({ message: 'Invalid refresh token' })
  }
}

export const AuthController = {
  login,
  signup,
  refreshToken,
}
