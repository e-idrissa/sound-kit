"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { v4 as uuid } from "uuid"

export async function getAllWarehouses() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return { warehouses, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting warehouses" })
    console.log("Error getting warehouses", error)
    return { warehouses: null, success: false }
  }
}

export async function createWarehouse(data: { name: string }) {
  try {
    const warehouse = await prisma.warehouse.create({
      data: {
        id: uuid(),
        name: data.name,
      },
    })
    
    return { warehouse, success: true }
  } catch (error) {
    handleError({ error, message: "Error creating warehouse" })
    return { warehouse: null, success: false }
  }
}
