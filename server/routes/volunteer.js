import express from 'express'
import { VolunteerController } from '../controllers/VolunteerController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const volunteerRouter = express.Router()
volunteerRouter.post('/', VolunteerController.addVolunteer)
volunteerRouter.get('/', VolunteerController.getAllVolunteers)
volunteerRouter.put('/:id', VolunteerController.updateVolunteer)
volunteerRouter.delete('/:id', VolunteerController.deleteVolunteer)
volunteerRouter.get('/org', [isAuth, isAdmin], VolunteerController.getOrgVolunteers)
volunteerRouter.get('/request', [isAuth, isAdmin], VolunteerController.getOrgRequests)

export default volunteerRouter
