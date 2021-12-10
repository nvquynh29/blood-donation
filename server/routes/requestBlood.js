import express from 'express'
import { RequestBloodController } from '../controllers/RequestBloodController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const requestBloodRouter = express.Router()

requestBloodRouter.post('/', RequestBloodController.addRequestBlood)
requestBloodRouter.get('/', [isAuth, isAdmin], RequestBloodController.getPendingRequests)
requestBloodRouter.get('/accepted', [isAuth, isAdmin], RequestBloodController.getAcceptedRequests)
requestBloodRouter.delete('/:id', [isAuth, isAdmin], RequestBloodController.deleteRequest)
requestBloodRouter.put('/markAsAccepted/list', [isAuth, isAdmin], RequestBloodController.markAsAccepted)
requestBloodRouter.patch('/:id', [isAuth, isAdmin], RequestBloodController.updateRequestStatus)

export default requestBloodRouter
