"use server";

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '../database/prisma';
import { handleError } from '../utils';

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    handleError({ error, message: "Error getting connection informations" })
  }
}

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