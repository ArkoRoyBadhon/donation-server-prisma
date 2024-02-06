import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/auth/signup', userController.createUser)
router.get('/auth/get-user/:id', userController.getSingleUserById)

export const userRoutes = router
