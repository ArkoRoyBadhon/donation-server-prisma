import express from 'express'
import { userRoutes } from '../modules/user/user.routes'
import { donationRoutes } from '../modules/donation/donation.routes'
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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
