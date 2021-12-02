import express from 'express'
import { RequestBloodController } from '../controllers/RequestBloodController.js'

const requestBloodRouter = express.Router()

requestBloodRouter.post('/', RequestBloodController.addRequestBlood)

export default requestBloodRouter
