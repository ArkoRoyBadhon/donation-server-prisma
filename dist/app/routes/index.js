'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const user_routes_1 = require('../modules/user/user.routes')
const donation_routes_1 = require('../modules/donation/donation.routes')
const router = express_1.default.Router()
const moduleRoutes = [
  {
    path: '/',
    route: user_routes_1.userRoutes,
  },
  {
    path: '/',
    route: donation_routes_1.donationRoutes,
  },
]
moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})
exports.default = router
