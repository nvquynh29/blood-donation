import express from 'express'
import{ EventController } from '../controllers/EventController.js'

const eventRouter = express.Router()

eventRouter.post('/', EventController.createEvent)

export default eventRouter