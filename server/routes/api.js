import express from 'express'
import { check } from 'express-validator'
import isAuth from '../middleware/AuthMiddleware.js'
import { AuthController } from '../controllers/AuthController.js'

const router = express.Router()
const initAPIs = (app) => {
  router.post('/signup', [
    check('email')
      .isEmail(),
    check('password')
      .isLength({
        min: 6,
      }),
  ], AuthController.signup)
  router.post('/login', [
    check('email')
      .isEmail(),
    check('password')
      .isLength({
        min: 6,
      }),
  ], AuthController.login)
  router.post('/refresh-token', AuthController.refreshToken)

  // middleware routes
  router.use(isAuth)
  return app.use('/', router)
}

export default initAPIs
