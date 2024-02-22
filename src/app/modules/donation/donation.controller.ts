import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { donationService } from './donation.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await donationService.createDonation(data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation created successfully!',
    data: result,
  })
})

const getAllDonation = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req.query

  const result = await donationService.getAllDonation(searchTerm as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Donation Retrieved successfully!',
    data: result,
  })
})

const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await donationService.getSingleDonation(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Retrieved successfully!',
    data: result,
  })
})

const updateSingleDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await donationService.updateSingleDonation(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation updated successfully!',
    data: result,
  })
})

const deleteSingleDonation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await donationService.deleteSingleDonation(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation deleted successfully!',
    data: result,
  })
})

const donationExecute = catchAsync(async (req: Request, res: Response) => {
  const data = req.body

  const result = await donationService.donationExecute(data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You successfully Donate!',
    data: result,
  })
})

const getAllDonationExecute = catchAsync(
  async (req: Request, res: Response) => {
    const result = await donationService.getAllDonationExecute()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Donation retrieved successfully!',
      data: result,
    })
  },
)

const getSingleUserDonationExecute = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }
    let verifiedUser = null

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
    const { userId } = verifiedUser

    console.log('User idd', userId)

    const result = await donationService.getSingleUserDonationExecute(userId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Donation retrieved successfully!',
      data: result,
    })
  },
)

const donationCalculations = catchAsync(async (req: Request, res: Response) => {
  const result = await donationService.donationCalculations()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Donation Calculations retrieved successfully!',
    data: result,
  })
})

export const donationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateSingleDonation,
  deleteSingleDonation,
  donationExecute,
  getAllDonationExecute,
  getSingleUserDonationExecute,
  donationCalculations,
}
