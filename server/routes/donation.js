import express from 'express'
import * as DonationController from '../controllers/DonationController.js'
import isAuth from '../middleware/AuthMiddleware.js'
import isAdmin from '../middleware/AdminMiddleware.js'

const router = express.Router()

router.post('/find', DonationController.findDonation)
router.post('/', DonationController.createDonation)
router.patch('/:id', DonationController.updateDonationStatus)
router.put('/:id', DonationController.updateDonation)
router.get('/event/:event_id', [isAuth, isAdmin], DonationController.getEventDonation)
router.get('/:id', [isAuth, isAdmin], DonationController.getDonation)
router.delete('/:id', [isAuth, isAdmin], DonationController.deleteDonation)
router.get('/history/:citizen_id', DonationController.donateHistory)
export default router
