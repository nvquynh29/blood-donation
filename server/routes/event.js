import express from 'express'
import { EventController } from '../controllers/EventController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const eventRouter = express.Router()

eventRouter.delete('/:id', [isAuth, isAdmin], EventController.deleteEvent)
eventRouter.put('/:id', [isAuth, isAdmin], EventController.updateEvent)
eventRouter.post('/', [isAuth, isAdmin], EventController.createEvent)
eventRouter.get('/detail/:id', EventController.getEventDetail)
eventRouter.get('/listVolunteer/:id', EventController.getEventVolunteerId)
eventRouter.get('/ongoing', EventController.getOngoingAndFutureEvent)
eventRouter.get('/', [isAuth, isAdmin], EventController.getAllEvent)

export default eventRouter
