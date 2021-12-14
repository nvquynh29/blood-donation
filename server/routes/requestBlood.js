import express from 'express'
import { RequestBloodController } from '../controllers/RequestBloodController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'
import isSuperAdmin from '../middleware/SuperAdminMiddleware.js'

const requestBloodRouter = express.Router()

requestBloodRouter.post('/', RequestBloodController.addRequestBlood)
requestBloodRouter.get('/', isAuth, RequestBloodController.getPendingRequests)
requestBloodRouter.get('/:id', RequestBloodController.getRequestBlood)
requestBloodRouter.get('/all/accepted', [isAuth, isAdmin], RequestBloodController.getAcceptedRequests)
requestBloodRouter.delete('/:id', isAuth, RequestBloodController.deleteRequest)
requestBloodRouter.put('/markAsAccepted/list', isAuth, RequestBloodController.markAsAccepted)
requestBloodRouter.put('/all/:id', isAuth, RequestBloodController.updateRequestBlood)
requestBloodRouter.patch('/:id', [isAuth, isAdmin], RequestBloodController.updateRequestStatus)

export default requestBloodRouter
