import express from 'express'
import * as DonationController from '../controllers/DonationController.js'

const router = express.Router()

router.post('/find', DonationController.findDonation)
router.post('/', DonationController.createDonation)
export default router
