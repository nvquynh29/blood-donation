import express from 'express'
import { RequestBloodController } from '../controllers/RequestBloodController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const requestBloodRouter = express.Router()

requestBloodRouter.post('/', RequestBloodController.addRequestBlood)
requestBloodRouter.get('/', RequestBloodController.getRequests)
requestBloodRouter.put('/markAsAccepted/list', [isAuth, isAdmin], RequestBloodController.markAsAccepted)

export default requestBloodRouter
