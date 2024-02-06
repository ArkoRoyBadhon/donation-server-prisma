import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createUser = async (data: User): Promise<Partial<User | null>> => {
  const result = await prisma.user.create({
    data,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...others } = result

  return others
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleUserById = async (id: string): Promise<User | any> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    return result
  } catch (error) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong')
  }
}

export const userService = {
  createUser,
  getSingleUserById,
}
