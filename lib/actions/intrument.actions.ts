"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { v4 as uuid } from "uuid"
import { createQRCode } from "./qrCode.actions"

export async function createInstrument(data: createInstrumentParams) {
  const quantity = Number(data.quantity) || 1

  try {
    const instruments = await Promise.all(
      Array.from({ length: quantity }).map(async () => {
        const { qrCode, success } = await createQRCode()
        if (!success || !qrCode) throw new Error("QR Code generation failed")

        const instrument = await prisma.instrument.create({
          data: {
            id: uuid(),
            qrCodeId: qrCode.id,
            categoryId: data.categoryId,
            brandId: data.brandId,
            warehouseId: data.warehouseId,
            state: data.state,
            isAffected: false,
            situation: "available",
            inUse: false,
            userId: undefined,
          },
        })

        return instrument
      })
    )
    
    return { instruments, success: true }
  } catch (error) {
    handleError({ error, message: "Error creating instrument" })
    return { instruments: null, success: false }
  }
}

export async function editInstrument(data: editInstrumentParams) {
  const isAffected = data.userId !== ""

  try {
    const instrument = await prisma.instrument.update({
      where: {
        id: data.id
      },
      data: {
        qrCodeId: data.qrCodeId,
        categoryId: data.categoryId,
        brandId: data.brandId,
        warehouseId: data.warehouseId,
        state: data.state,
        situation: data.situation,
        userId: data.userId,
        isAffected,
        inUse: false,
      },
    })
    
    return { instrument, success: true }
  } catch (error) {
    handleError({ error, message: "Error editing instrument" })
    return { instrument: null, success: false }
  }
}

export async function deleteInstrument(id: string) {
  try {
    const instrument = await prisma.instrument.delete({
      where: {
        id
      },
    })

    const qrCode = await prisma.qRCode.delete({
      where: {
        id: instrument.qrCodeId
      },
    })
    
    return { 
      instrument,
      qrCode,
      success: true 
    }
  } catch (error) {
    handleError({ error, message: "Error deleting instrument" })
    return { instrument: null, qrCode: null, success: false }
  }
}

export async function getAllInstruments() {
  try {
    const instruments = await prisma.instrument.findMany({
      include: {
        qrCode: {
          select: { imageUrl: true },
        },
        category: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
        warehouse: {
          select: { id: true, name: true },
        },
        user: {
          select: { id: true, firstname: true, lastname: true },
        }
      },
    })

    const formattedInstruments = instruments.map((instrument) => ({
      id: instrument.id,
      qrCodeId: instrument.qrCodeId,
      categoryId: instrument.categoryId,
      brandId: instrument.brandId,
      warehouseId: instrument.warehouseId,
      qrCodeImg: instrument.qrCode?.imageUrl || null,
      category: instrument.category?.name || null,
      brand: instrument.brand?.name || null,
      warehouse: instrument.warehouse?.name || null,
      rentalId: instrument.rentalId,
      state: instrument.state,
      situation: instrument.situation,
      userId: instrument.userId,
      isAffected: instrument.isAffected,
      inUse: instrument.inUse,
      user: instrument.user?.firstname + " " + instrument.user?.lastname || null,
    }))

    const reparationCount = formattedInstruments.filter((instrument) => instrument.state === "reparation").length
    const damagedCount = formattedInstruments.filter((instrument) => instrument.state === "dated").length
    const inUseCount = formattedInstruments.filter((instrument) => instrument.inUse).length


    return { 
      instruments: formattedInstruments,
      instrumentsCount: formattedInstruments.length,
      reparationCount,
      damagedCount,
      inUseCount,
      success: true 
    }
  } catch (error) {
    handleError({ error, message: "Error getting instruments" })
    return { 
      instruments: null, 
      instrumentsCount: 0, 
      reparationCount: 0, 
      damagedCount: 0, 
      inUseCount: 0, 
      success: false 
    }
  }
} 

export async function getInstrumentById(id: string) {
  try {
    const instrument = await prisma.instrument.findUnique({
      where: {
        id
      }
    })
    
    return { instrument, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting instrument" })
    return { instrument: null, success: false }
  }
}

export async function getInstrumentsByUserId(userId: string) {
  const categoryColorMap: Record<string, string> = {
    guitar: "var(--color-guitar)",
    bass: "var(--color-bass)",
    micro: "var(--color-micro)",
    piano: "var(--color-piano)",
    others: "var(--color-others)",
  }

  try {
    const instruments = await prisma.instrument.findMany({
      where: {
        userId
      },
      include: {
        qrCode: {
          select: { imageUrl: true },
        },
        category: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
        warehouse: {
          select: { id: true, name: true },
        },
      },
    })

    const formattedInstruments = instruments.map((instrument) => ({
      id: instrument.id,
      qrCodeId: instrument.qrCodeId,
      categoryId: instrument.categoryId,
      brandId: instrument.brandId,
      warehouseId: instrument.warehouseId,
      qrCodeImg: instrument.qrCode?.imageUrl || null,
      category: instrument.category?.name || null,
      brand: instrument.brand?.name || null,
      warehouse: instrument.warehouse?.name || null,
      rentalId: instrument.rentalId,
      state: instrument.state,
      situation: instrument.situation,
      userId: instrument.userId,
      isAffected: instrument.isAffected,
      inUse: instrument.inUse,
    }))

    const categoryCounts: Record<string, number> = {}

    formattedInstruments.forEach(({ category }) => {
      const key = category?.toLowerCase() || "others"
      categoryCounts[key] = (categoryCounts[key] || 0) + 1
    })

    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      fill: categoryColorMap[category] || "var(--color-others)",
    }))

    const recentInstruments = await prisma.instrument.findMany({
      where: {
        userId
      },
      include: {
        qrCode: {
          select: { imageUrl: true },
        },
        category: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
        warehouse: {
          select: { id: true, name: true },
        },
        user: {
          select: { id: true, firstname: true, lastname: true },
        }
      },
      take: 5
    })

    const formattedRecentInstruments = recentInstruments.map((instrument) => ({
      id: instrument.id,
      qrCodeId: instrument.qrCodeId,
      categoryId: instrument.categoryId,
      brandId: instrument.brandId,
      warehouseId: instrument.warehouseId,
      qrCodeImg: instrument.qrCode?.imageUrl || null,
      category: instrument.category?.name || null,
      brand: instrument.brand?.name || null,
      warehouse: instrument.warehouse?.name || null,
      rentalId: instrument.rentalId,
      state: instrument.state,
      situation: instrument.situation,
      userId: instrument.userId,
      isAffected: instrument.isAffected,
      inUse: instrument.inUse,
      user: instrument.user?.firstname + " " + instrument.user?.lastname || null,
    }))
    
    return { 
      instruments: formattedInstruments,
      instrumentsCount: instruments.length,
      recentInstruments: formattedRecentInstruments, 
      chartData,
      success: true 
    }
  } catch (error) {
    handleError({ error, message: "Error getting instruments" })
    return { 
      instruments: null, 
      instrumentsCount: 0,
      recentInstruments: null,
      chartData: null,
      success: false 
    }
  }
}

export async function toggleInstrumentUsage(id: string) {
  try {
    const instrument = await prisma.instrument.findUnique({
      where: { id },
      select: { inUse: true }
    })

    if (!instrument) {
      throw new Error("Instrument not found")
    }

    const instrumentUpdated = await prisma.instrument.update({
      where: { id },
      data: { inUse: !instrument.inUse }
    })

    revalidatePath("/") // optional: revalidate home or wherever needed
    return { success: true, updated: instrumentUpdated.inUse }
  } catch (error) {
    handleError({ error, message: "Error getting instruments" })
    return { success: false, updated: null }
  }
}

export async function getAvailableInstruments() {
  try {
    const instruments = await prisma.instrument.findMany({
      where: {
        inUse: false,
        situation: "available"
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    const formattedInstruments = instruments.map((instrument) => ({
      id: instrument.id,
      categoryId: instrument.categoryId,
      category: instrument.category?.name || null,
    }))
    
    return { instruments: formattedInstruments, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting instruments" })
    return { instruments: null, success: false }
  }
}
