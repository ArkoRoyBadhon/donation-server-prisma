import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { userService } from './user.service'
import config from '../../../config'
import bcrypt from 'bcrypt'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bycrypt_salt_rounds),
  )
  payload.password = hashPassword
  const result = await userService.createUser(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

const getSingleUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await userService.getSingleUserById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Get successfully!',
    data: result,
  })
})

export const userController = {
  createUser,
  getSingleUserById,
}
