import express from 'express'
import isAuth from '../middleware/AuthMiddleware.js'
import { AuthController } from '../controllers/AuthController.js'

const router = express.Router()
const initAPIs = (app) => {
  router.post('/signup', AuthController.signup)
  router.post('/login', AuthController.login)
  router.post('/refresh-token', AuthController.refreshToken)

  // middleware routes
  router.use(isAuth)
  return app.use('/', router)
}

export default initAPIs
