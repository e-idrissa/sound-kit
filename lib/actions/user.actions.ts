"use server";

import { prisma } from '../database/prisma';
import { handleError } from '../utils';
import { v4 as uuid } from 'uuid'
import { sendAccountInfosEmail } from '../email'
import bcrypt from 'bcrypt'

export async function getUserById(id: string) {
  const userId = id

  if (!userId) return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        instruments: {
          select: {id : true}
        },
      }
    })
    const formattedUser = {
      id: user!.id,
      firstname: user!.firstname,
      lastname: user!.lastname,
      role: user!.role,
      email: user!.email,
      status: user!.status,
      instruments: user!.instruments || [],
    }

    return formattedUser
  } catch (error) {
    handleError({ error, message: "Error fetching user informations" })
  }
}

export async function createUser(data: CreateUserParams) {
  const { firstname, lastname, email, role } = data
  const status = "INACTIVE"
  const tempPwd = '1234@Default';
  const hashedPassword = await bcrypt.hash(tempPwd, 10)

  try {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        firstname,
        lastname,
        email,
        role,
        status,
        password: hashedPassword,
        },
    })

    await sendAccountInfosEmail(email, firstname, tempPwd)

    return {user: user!, success: true}
  } catch (error) {
    handleError({ error, message: "Error creating user" })
    return {user: null, success: false}
  }
}

export async function updateUser(data: CreateUserParams) {
  const { firstname, lastname, email, role } = data

  try {
    const user = await prisma.user.update({
      where: { email: data.email },
      data: {
        firstname,
        lastname,
        email,
        role,
        },
    })

    return {user: user!, success: true}
  } catch (error) {
    handleError({ error, message: "Error updating user" })
    return {user: null, success: false}
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        instruments: {
          select: {id : true}
        },
      }
    })

    const formattedUsers = users.map((user) => {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        name: `${user.firstname} ${user.lastname}`,
        role: user.role,
        email: user.email,
        status: user.status,
        instruments: user.instruments || [],
      }
    })

    const selectUsers = users.map((user) => {
      return {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
      }
    })
    return {
      formattedUsers,
      selectUsers,
      success: true
    }
  } catch (error) {
    handleError({ error, message: "Error fetching users" })
    return {
      formattedUsers: null,
      selectUsers: null,
      success: false
    }
  }
}
