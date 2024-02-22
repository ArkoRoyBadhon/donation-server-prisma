import express from 'express'
import { userRoutes } from '../modules/user/user.routes'
import { donationRoutes } from '../modules/donation/donation.routes'
import { paymentRoutes } from '../modules/payment/payment.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/',
    route: userRoutes,
  },
  {
    path: '/',
    route: donationRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
