import { Donation, DonationDone } from '@prisma/client'
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

const updateSingleDonation = async (
  id: string,
  payload: Partial<Donation>,
): Promise<Donation | null> => {
  // const result = await prisma.donation.findUnique({
  //   where: {
  //     id,
  //   },
  // })

  const result = await prisma.donation.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

const donationExecute = async (data: DonationDone): Promise<DonationDone> => {
  const result = await prisma.donationDone.create({
    data,
  })

  return result
}

const getAllDonationExecute = async (): Promise<DonationDone[] | null> => {
  const result = await prisma.donationDone.findMany({
    include: {
      userInfo: true,
      donationInfo: true,
    },
  })

  return result
}

const getSingleUserDonationExecute = async (
  id: string,
): Promise<DonationDone[] | null> => {
  const result = await prisma.donationDone.findMany({
    where: {
      userId: id,
    },
    include: {
      userInfo: true,
      donationInfo: true,
    },
  })

  return result
}

const donationCalculations = async () => {
  const result = await prisma.donationDone.findMany({
    include: {
      userInfo: true,
      donationInfo: true,
    },
  })

  // category
  // food, education, clothing, health, religion

  let totalDonationAmount = 0
  let foodAmount = 0
  let educationAmount = 0
  let clothingAmount = 0
  let healthAmount = 0
  let religionAmount = 0

  result.forEach(donation => {
    totalDonationAmount += donation.amount
    if (donation?.donationInfo?.category === 'food') {
      foodAmount += donation.amount
    }
    if (donation?.donationInfo?.category === 'education') {
      educationAmount += donation.amount
    }
    if (donation?.donationInfo?.category === 'clothing') {
      clothingAmount += donation.amount
    }
    if (donation?.donationInfo?.category === 'health') {
      healthAmount += donation.amount
    }
    if (donation?.donationInfo?.category === 'religion') {
      religionAmount += donation.amount
    }
  })

  const totalDonation = result.length

  const output = {
    totalDonation,
    totalDonationAmount,
    foodAmount,
    educationAmount,
    clothingAmount,
    healthAmount,
    religionAmount,
  }

  return output
}

export const donationService = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateSingleDonation,
  // user give donations
  donationExecute,
  getAllDonationExecute,
  getSingleUserDonationExecute,
  donationCalculations,
}
