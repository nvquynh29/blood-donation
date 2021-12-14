/* eslint-disable import/no-named-as-default */
import express from 'express'
import { VolunteerController } from '../controllers/VolunteerController.js'
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import isAdmin from '../middleware/AdminMiddleware.js'
import isAuth from '../middleware/AuthMiddleware.js'

const volunteerRouter = express.Router()
volunteerRouter.post('/', VolunteerController.addVolunteer)
volunteerRouter.post('/org', [isAuth, isAdmin], VolunteerController.addVolunteerAdmin)
volunteerRouter.get('/', VolunteerController.getAllVolunteers)
volunteerRouter.get('/info/:id', VolunteerController.getVolunteer)
volunteerRouter.put('/markAsAccepted/list', VolunteerController.markAsAccepted)
volunteerRouter.put('/:id', VolunteerController.updateVolunteer)
volunteerRouter.delete('/:id', VolunteerController.deleteVolunteer)
volunteerRouter.get('/org', [isAuth, isAdmin], VolunteerController.getOrgVolunteers)
volunteerRouter.get('/request', [isAuth, isAdmin], VolunteerController.getOrgRequests)

export default volunteerRouter
