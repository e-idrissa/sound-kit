"use server";

import { errorHandler } from "../errors";

import { prisma } from '@/lib/database/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET!

export async function handleSignIn(values: SignInParams) {
  const { email, password } = values

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid email')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid password')

  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1h' })

    ; (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    })

  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  redirect('/sign-in')
}

export const handleSignUp = async (values: SignUpParams) => {
  try {
    console.log(values)
  } catch (error) {
    errorHandler(error)
  }

  return { success: true }
}

export const handleForgotPassword = async (values: ForgotPasswordParams) => {
  try {
    console.log(values.email)
  } catch (error) {
    errorHandler(error)
  }

  return { success: true }
}
