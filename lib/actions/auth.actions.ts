"use server";

import { errorHandler } from "../errors";

import { prisma } from '@/lib/database/prisma'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { handleError, hashToken } from "../utils";
import { sendResetPasswordEmail } from "../email";

const SECRET = process.env.JWT_SECRET!
const TEMP_SECRET = process.env.JWT_TMP_SECRET!

export async function getAuthToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  } catch (error) {
    handleError({ error, message: "Error getting connection informations" })
  }
}

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

export const handleSetPassword = async (values: SetPasswordParams) => {
  const { password, userId } = values
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })

    return { user: user!, success: true }
  } catch (error) {
    handleError({ error, message: "Error updating user" })
    return { user: null, success: false }
  }
}

export const createHashToken = async ({ token, userId }: createHashTokenParams) => {
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expire dans 1h

  const tokenHash = hashToken(token)
  const record = await prisma.passwordResetToken.create({
    data: {
      id: uuid(),
      tokenHash,
      expiresAt,
      userId,
    },
  })

  return record
}

export const handleForgotPassword = async (values: ForgotPasswordParams) => {
  const { email } = values

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { success: false, message: "Invalid email" }

    const token = jwt.sign({ userId: user.id }, TEMP_SECRET, { expiresIn: '1h' })

    const result = await sendResetPasswordEmail(email, user.firstname, token)
    if (!result.success) return { success: false, message: "Error sending reset password email" }

    const hashToken = await createHashToken({ token, userId: user.id })
    if (!hashToken) return { success: false, message: "Error creating hash token" }

    return {
      success: true,
      message: "Reset email sent. Check your inbox.",
      url: result.url
    }
  } catch (error) {
    errorHandler(error)
    return {
      success: false,
      message: "Error sending reset password email",
      url: null
    }
  }
}

export async function validateResetToken(token: string) {
  const tokenHash = hashToken(token)
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true
        }
      }
    },
  })

  if (!record || record.expiresAt < new Date()) {
    return { valid: false, user: null }
  }

  return { valid: true, user: record.user }
}
