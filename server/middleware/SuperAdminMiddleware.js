import User from '../models/User.js'

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
    if (user.role.toLowerCase() === 'superadmin') {
      next()
    } else {
      return res.status(403).json({ message: 'forbidden' })
    }
  } catch (error) {
    return res.status(500).json({ msg: 'server error' })
  }
}

export default isSuperAdmin
