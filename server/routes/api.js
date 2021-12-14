import express from 'express'
import { check } from 'express-validator'
import isAuth from '../middleware/AuthMiddleware.js'
import { AuthController } from '../controllers/AuthController.js'
import { sendOTP, verifyOTP } from '../helpers/otp.helper.js'
import { OrganizationController } from '../controllers/OrganizationController.js'
import { EventController } from '../controllers/EventController.js'

const router = express.Router()
const initAPIs = (app) => {
  router.post(
    '/signup',
    [
      check('email').isEmail(),
      check('password').isLength({
        min: 6,
      }),
    ],
    AuthController.signup,
  )
  router.post(
    '/login',
    [
      check('email').isEmail(),
      check('password').isLength({
        min: 6,
      }),
    ],
    AuthController.login,
  )
  router.post('/otp', sendOTP)
  router.post('/verify-otp', verifyOTP)
  router.get('/refresh-token', AuthController.refreshToken)
  // organization route
  router.get('/organization', OrganizationController.getAllOrganizations)
  router.get('/organization/:id', OrganizationController.getOrganization)
  router.get('/getFile', OrganizationController.getImage)
  // middleware routes
  router.use(isAuth)
  return app.use('/', router)
}

export default initAPIs
