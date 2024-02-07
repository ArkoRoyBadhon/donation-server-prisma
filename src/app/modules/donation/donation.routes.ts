import express from 'express'
import { donationController } from './donation.controller'

const router = express.Router()

router.post('/donation/create', donationController.createDonation)
// router.get('/auth/get-user/:id', userController.getSingleUserById)

export const donationRoutes = router
