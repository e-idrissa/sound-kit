"use server";

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { v4 as uuid } from "uuid"

export async function getRentalReasons() {
  try {
    const rentalReasons = await prisma.rentalReason.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return { rentalReasons, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting rental reasons" })
    return { rentalReasons: null, success: false }
  }
}

export async function createRental(data: createRentalParams) {
  try {
    const rental = await prisma.rental.create({
      data: {
        id: uuid(),
        userId: data.userId,
        instruments: {
          connect: data.instrumentIds.map(id => ({ id })),
        },
        reasonId: data.rentalReasonId,
        startDate: data.startDate,
        endDate: data.endDate,
        status: "pending",
      }
    })

    return { rental, success: true }
  } catch (error) {
    handleError({ error, message: "Error creating rental" })
    return { rental: null, success: false }
  }
}

export async function getAllRentals() {
  try {
    const rentals = await prisma.rental.findMany({
      include: {
        instruments: true,
        reason: true,
      },
    })

    const formattedrentals = rentals.map((rental, idx) => ({
      id: String(idx + 1),
      rentalId: rental.id,
      qrCodeId: rental.instruments[0].qrCodeId,
      user: rental.userId,
      startDate: rental.startDate,
      endDate: rental.endDate,
      status: rental.status,
      rentalReason: rental.reason.name,
    }))

    const activeRentals = formattedrentals.filter(rental => rental.status === "active")
    const closedRentals = formattedrentals.filter(rental => rental.status === "closed")
    const pendingRentals = formattedrentals.filter(rental => rental.status === "pending")

    return {
      rentals: formattedrentals,
      success: true,
      totalRentals: formattedrentals.length,
      activeRentals,
      activeRentalsCount: activeRentals.length,
      closedRentals,
      closedRentalsCount: closedRentals.length,
      pendingRentals,
      pendingRentalsCount: pendingRentals.length
    }
  } catch (error) {
    handleError({ error, message: "Error getting rentals" })
    return {
      rentals: null,
      success: false,
      totalRentals: null,
      activeRentals: null,
      closedRentals: null,
      pendingRentals: null
    }
  }
}

export async function getRentalsByUserId(userId: string) {
  try {
    const rentals = await prisma.rental.findMany({
      where: {
        userId,
      },
      include: {
        instruments: true,
        reason: true,
      },
    })

    const formattedrentals = rentals.map((rental, idx) => ({
      id: String(idx + 1),
      rentalId: rental.id,
      qrCodeId: rental.instruments[0].qrCodeId,
      user: rental.userId,
      startDate: rental.startDate,
      endDate: rental.endDate,
      status: rental.status,
      rentalReason: rental.reason.name,
    }))

    const activeRentals = formattedrentals.filter(rental => rental.status === "active")
    const closedRentals = formattedrentals.filter(rental => rental.status === "closed")
    const pendingRentals = formattedrentals.filter(rental => rental.status === "pending")

    return {
      rentals: formattedrentals,
      success: true,
      totalRentals: formattedrentals.length,
      activeRentals,
      activeRentalsCount: activeRentals.length,
      closedRentals,
      closedRentalsCount: closedRentals.length,
      pendingRentals,
      pendingRentalsCount: pendingRentals.length
    }
  } catch (error) {
    handleError({ error, message: "Error getting rentals by user id" })
    return {
      rentals: null,
      success: false,
      totalRentals: null,
      activeRentals: null,
      closedRentals: null,
      pendingRentals: null
    }
  }
}

export async function deleteRental(id: string) {
  try {
    const rental = await prisma.rental.findUnique({
      where: { id },
      include: {
        instruments: true,
      },
    })

    if (!rental) {
      return { rental: null, success: false, message: "Rental not found" }
    }

    const updatedInstruments = await Promise.all(
      rental.instruments.map(async (instrument) => {
        return await prisma.instrument.update({
          where: { id: instrument.id },
          data: {
            inUse: false,
            situation: "available",
          },
        })
      })
    )

    const deletedRental = await prisma.rental.delete({
      where: { id },
    })

    return {
      rental: deletedRental,
      success: true,
      updatedInstruments: updatedInstruments.length,
      message: "Rental deleted successfully"
    }
  } catch (error) {
    handleError({ error, message: "Error deleting rental" })
    return {
      rental: null,
      success: false,
      updatedInstruments: null,
      message: "Failed to delete rental"
    }
  }
}

export async function getPendingRentals() {
  try {
    const pendingRentals = await prisma.rental.findMany({
      where: {
        status: "pending",
      },
      include: {
        instruments: true,
        reason: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          }
        },
      },
    })

    const formattedPendingRentals = pendingRentals.map((rental) => ({
      rental: {
        rentalId: rental.id,
        user: rental.user?.firstname + " " + rental.user?.lastname,
        startDate: rental.startDate,
        endDate: rental.endDate,
        status: rental.status,
        rentalReason: rental.reason.name,
        instruments: rental.instruments.length,
      }
    }))

    return { pendingRentals: formattedPendingRentals, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting pending rentals" })
    return { pendingRentals: null, success: false }
  }
}

export async function confirmRental(id: string) {
  try {
    const rental = await prisma.rental.update({
      where: { id },
      data: {
        status: "active",
      },
    })

    return { rental, success: true }
  } catch (error) {
    handleError({ error, message: "Error confirming rental" })
    return { rental: null, success: false }
  }
}

export async function rejectRental(id: string) {
  try {
    const rental = await prisma.rental.update({
      where: { id },
      data: {
        status: "rejected",
      },
    })

    return { rental, success: true }
  } catch (error) {
    handleError({ error, message: "Error rejecting rental" })
    return { rental: null, success: false }
  }
}
