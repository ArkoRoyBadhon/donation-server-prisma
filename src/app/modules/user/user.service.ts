import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { ILoginAllUser, ILoginAllUserResponse } from '../../../interfaces/auth'
import bcrypt from 'bcrypt'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'

const createUser = async (data: User): Promise<Partial<User | null>> => {
  const exist = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  })

  if (exist) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'User already exists')
  }

  const result = await prisma.user.create({
    data,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...others } = result

  return others
}
const updateUser = async (payload: User): Promise<Partial<User | null>> => {
  const { id, ...data } = payload
  const exist = await prisma.user.update({
    where: {
      id,
    },
    data,
  })

  if (exist) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'User already exists')
  }

  const result = await prisma.user.create({
    data,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...others } = result

  return others
}

const loginUser = async (
  payload: ILoginAllUser,
): Promise<ILoginAllUserResponse> => {
  const { email, password } = payload

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (!isUserExist.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Google user')
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const { id: userId, role } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
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

const getAllUser = async (): Promise<User[] | null> => {
  try {
    const result = await prisma.user.findMany({})

    return result
  } catch (error) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong')
  }
}

export const userService = {
  createUser,
  updateUser,
  loginUser,
  getSingleUserById,
  getAllUser,
}
