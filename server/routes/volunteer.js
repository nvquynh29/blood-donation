import express from 'express'
import { VolunteerController } from '../controllers/VolunteerController.js'

const volunteerRouter = express.Router()
volunteerRouter.post('/', VolunteerController.addVolunteer)

export default volunteerRouter
