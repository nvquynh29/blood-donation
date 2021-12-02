import User from '../models/User.js'

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
    if (user.role?.toLowerCase() === 'admin') {
      next()
    } else {
      return res.status(403).json({ message: 'forbidden' })
    }
  } catch (err) {
    return res.status(500).json({ message: 'server error' })
  }
}

export default isAdmin
