import User from "../models/User.js"

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.jwtDecoded._id })
        if (user.role === 'ADMIN') {
            next()
        } else {
            return res.status(403).json({ message: 'forbidden'})
        }
    } catch (err) {
        return res.status(500).json({ message: 'server error'})
    }
}

export default isAdmin 