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

export const donationController = {
  createDonation,
}
