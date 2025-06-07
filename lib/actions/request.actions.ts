"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"

export async function confirmRequest(id: string) {
  try {
    const request = await prisma.request.update({
      where: { id },
      data: {
        status: "approved",
      },
    })

    return { request, success: true }
  } catch (error) {
    handleError({ error, message: "Error confirming request" })
    return { request: null, success: false }
  }
}

export async function rejectRequest(id: string) {
  try {
    const request = await prisma.request.update({
      where: { id },
      data: {
        status: "rejected",
      },
    })

    return { request, success: true }
  } catch (error) {
    handleError({ error, message: "Error rejecting request" })
    return { request: null, success: false }
  }
}
