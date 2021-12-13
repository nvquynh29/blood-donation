import express from 'express'
import * as DonationController from '../controllers/DonationController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const router = express.Router()

router.post('/find', DonationController.findDonation)
router.post('/', DonationController.createDonation)
router.patch('/:id', DonationController.updateDonationStatus)
router.get('/event/:event_id', [isAuth, isAdmin], DonationController.getEventDonation)
router.delete('/:id', [isAuth, isAdmin], DonationController.deleteDonation)
router.get('/:citizen_id', DonationController.donateHistory)
export default router
