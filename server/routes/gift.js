import express from 'express'
import { GiftController } from '../controllers/GiftController.js'

const giftRouter = express.Router()

giftRouter.get('/', GiftController.getAllGift)

export default giftRouter
