import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { donationService } from './donation.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'

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
  const result = await donationService.getAllDonation()

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

export const donationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
}
