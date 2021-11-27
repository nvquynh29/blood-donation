import { jwtHelper } from '../helpers/jwt.helper.js'

const isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers['x-access-token'] || req.headers['X-ACCESS-TOKEN']
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          msg: error.message,
        })
      }

      return res.status(500).json({ error })
    }
  } else {
    return res.sendStatus(403)
  }
  return res.sendStatus(403)
}

export default isAuth
