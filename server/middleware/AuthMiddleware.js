import { jwtHelper } from '../helpers/jwt.helper.js'
import dotenv from 'dotenv'

dotenv.config()
const isAuth = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token']
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.ACCESS_TOKEN_SECRET)
      req.jwtDecoded = decoded
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } else {
    return res.status(403).json({ message: 'No token provided' })
  }
}

export default isAuth
