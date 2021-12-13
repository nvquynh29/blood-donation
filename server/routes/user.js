import express from 'express'
import { UserController } from '../controllers/UserController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'
import isSuperAdmin from '../middleware/SuperAdminMiddleware.js'

const userRouter = express.Router()

userRouter.get('/', isAuth, UserController.getUser)
userRouter.put('/', isAuth, UserController.updateUser)
userRouter.delete('/:id', [isAuth, isSuperAdmin], UserController.deleteUser)
userRouter.post('/', [isAuth, isSuperAdmin], UserController.addUser)

export default userRouter
