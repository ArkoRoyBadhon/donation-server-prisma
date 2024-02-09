import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/auth/signup', userController.createUser)
router.post('/auth/signin', userController.loginUser)
router.get('/auth/get-user', userController.getSingleUserById)

export const userRoutes = router
