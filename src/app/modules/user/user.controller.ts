import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { userService } from './user.service'
import config from '../../../config'
import bcrypt from 'bcrypt'
import { ILoginAllUserResponse } from '../../../interfaces/auth'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'

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

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  console.log('user', loginData)

  const result = await userService.loginUser(loginData)
  const { refreshToken, accessToken } = result

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginAllUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged In successfully !',
    data: { accessToken },
  })
})

const getSingleUserById = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params.id
  const token = req.headers.authorization
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
  }
  let verifiedUser = null

  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  const { userId } = verifiedUser
  console.log('AAA', userId)

  const result = await userService.getSingleUserById(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Get successfully!',
    data: result,
  })
})

export const userController = {
  createUser,
  loginUser,
  getSingleUserById,
}
