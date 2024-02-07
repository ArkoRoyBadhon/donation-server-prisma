import express from 'express'
import { donationController } from './donation.controller'

const router = express.Router()

router.post('/donation/create', donationController.createDonation)
router.get('/donation/get-all', donationController.getAllDonation)

export const donationRoutes = router
