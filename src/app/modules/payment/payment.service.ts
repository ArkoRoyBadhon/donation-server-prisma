/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment, PaymentStatus, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { sslService } from '../ssl/ssl.service'
import { paymentSearchableFields } from './payment.constant'
import { paginationsHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const initPayment = async (data: any) => {
  try {
    const timestamp = new Date().getTime().toString()
    const random = Math.random().toString(36).substring(2, 15)
    const new_trans_id = timestamp + '-' + random

    const paymentSession = await sslService.initPayment({
      total_amount: data.amount,
      tran_id: new_trans_id,
      cus_name: data.donar_name,
      cus_email: data.donar_email,
    })

    const info = {
      amount: data?.amount,
      transactionId: new_trans_id,
      userId: data?.donar_id,
      donationId: data?.donationId,
    }

    await prisma.payment.create({
      data: info,
    })

    await prisma.donationDone.create({
      data: {
        amount: data?.amount,
        userId: data?.donar_id,
        donationId: data?.donationId,
      },
    })

    return paymentSession.redirectGatewayURL
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'something went wrong')
  }
}

const webhook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    return {
      message: 'Invalid Payment',
    }
  }
  const result = await sslService.validate(payload)
  if (result?.status !== 'VALID') {
    return {
      message: 'Payment Failed',
    }
  }

  const { tran_id } = result
  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: PaymentStatus.PAID,
      paymentGatewayData: payload,
    },
  })

  return {
    message: 'Payment success',
  }
}

const getAllFromDB = async (
  filters: any,
  options: any,
): Promise<IGenericResponse<Payment[]>> => {
  const { limit, page, skip } = paginationsHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: paymentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.payment.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getByIdFromDB = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
  })
  return result
}

export const PaymentService = {
  initPayment,
  webhook,
  getAllFromDB,
  getByIdFromDB,
}
