"use server"

import { prisma } from "@/lib/database/prisma"
import { handleError } from "@/lib/utils"
import { v4 as uuid } from "uuid"

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    
    return { categories, success: true }
  } catch (error) {
    handleError({ error, message: "Error getting categories" })
    return { categories: null, success: false }
  }
}

export async function createCategory(data: { name: string }) {
  try {
    const category = await prisma.category.create({
      data: {
        id: uuid(),
        name: data.name,
      },
    })
    
    return { category, success: true }
  } catch (error) {
    handleError({ error, message: "Error creating category" })
    return { category: null, success: false }
  }
}