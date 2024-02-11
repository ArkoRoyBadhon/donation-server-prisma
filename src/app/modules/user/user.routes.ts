import express from 'express'
import { userController } from './user.controller'
import authPermission from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'

const router = express.Router()

router.post('/auth/signup', userController.createUser)
router.patch(
  '/auth/update',
  authPermission(ENUM_USER_ROLE.ADMIN),
  userController.updateUser,
)
router.post('/auth/signin', userController.loginUser)
router.get('/auth/get-user', userController.getSingleUserById)
router.get(
  '/auth/all-user',
  authPermission(ENUM_USER_ROLE.ADMIN),
  userController.getAllUser,
)

export const userRoutes = router
