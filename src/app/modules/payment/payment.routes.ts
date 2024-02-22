import express from 'express'
import { PaymentController } from './payment.controller'

const router = express.Router()

router.get(
  '/',
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getAllFromDB,
)
router.get(
  '/:id',
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getByIdFromDB,
)

// router.get(
//   '/:id',
// //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   PaymentController.getSingleUserPayment,
// )

router.post('/init', PaymentController.initPayment)
router.get('/webhook', PaymentController.webhook)

export const paymentRoutes = router
