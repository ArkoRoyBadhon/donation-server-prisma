import { Donation } from '@prisma/client'
import prisma from '../../../shared/prisma'

const createDonation = async (data: Donation): Promise<Donation> => {
  const result = await prisma.donation.create({ data })
  return result
}

const getAllDonation = async (): Promise<Donation[] | null> => {
  const result = await prisma.donation.findMany({})

  return result
}

const getSingleDonation = async (id: string): Promise<Donation | null> => {
  const result = await prisma.donation.findUnique({
    where: {
      id,
    },
  })

  return result
}

export const donationService = {
  createDonation,
  getAllDonation,
  getSingleDonation,
}
