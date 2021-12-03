import express from 'express'
import { UserController } from '../controllers/UserController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const userRouter = express.Router()

userRouter.get('/', [isAuth, isAdmin], UserController.getUser)
userRouter.put('/', [isAuth, isAdmin], UserController.updateUser)

export default userRouter
