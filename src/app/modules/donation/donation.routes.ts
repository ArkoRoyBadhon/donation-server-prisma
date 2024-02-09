import express from 'express'
import { donationController } from './donation.controller'
import authPermission from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'

const router = express.Router()

//donation card
router.post(
  '/donation/create',
  authPermission(ENUM_USER_ROLE.ADMIN),
  donationController.createDonation,
)
router.get('/donation/get-all', donationController.getAllDonation)
router.get('/donation/get-single/:id', donationController.getSingleDonation)
router.patch(
  '/donation/update/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  donationController.updateSingleDonation,
)
router.delete(
  '/donation/delete/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  donationController.deleteSingleDonation,
)

// user donation
router.post(
  '/donation/user-donate',
  authPermission(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  donationController.donationExecute,
)
router.get(
  '/donation/user-donate',
  authPermission(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  donationController.getAllDonationExecute,
)
router.get(
  '/donation/user-donate/:id',
  donationController.getSingleUserDonationExecute,
)
router.get(
  '/donation/calculation',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  donationController.donationCalculations,
)

export const donationRoutes = router
