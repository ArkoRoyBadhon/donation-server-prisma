import express from 'express'
import { donationController } from './donation.controller'

const router = express.Router()

router.post('/donation/create', donationController.createDonation)
router.get('/donation/get-all', donationController.getAllDonation)
router.get('/donation/get-single/:id', donationController.getSingleDonation)
router.patch('/donation/update/:id', donationController.updateSingleDonation)

export const donationRoutes = router
