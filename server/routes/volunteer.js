import express from 'express'
import { VolunteerController } from '../controllers/VolunteerController.js'

const volunteerRouter = express.Router()
volunteerRouter.post('/', VolunteerController.addVolunteer)
volunteerRouter.get('/', VolunteerController.getVolunteers)
volunteerRouter.put('/:id', VolunteerController.updateVolunteer)
volunteerRouter.delete('/:id', VolunteerController.deleteVolunteer)

export default volunteerRouter
