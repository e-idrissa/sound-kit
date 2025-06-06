"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { v4 as uuid } from "uuid"

export async function getAllBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    
    return { brands, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting brands" })
    return { brands: null, success: false }
  }
}

export async function createBrand(data: { name: string }) {
  try {
    const brand = await prisma.brand.create({
      data: {
        id: uuid(),
        name: data.name,
      },
    })
    
    return { brand, success: true }
  } catch (error) {
    handleError({ error, message: "Error creating brand" })
    return { brand: null, success: false }
  }
}
