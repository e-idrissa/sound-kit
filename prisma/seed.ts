import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin-123', 10)

  // Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      id: uuid(),
      email: 'admin@gmail.com',
      password: hashedPassword,
      firstname: 'Admin',
      lastname: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })

  // Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { id: uuid(), name: 'Guitare' } }),
    prisma.category.create({ data: { id: uuid(), name: 'Batterie' } }),
    prisma.category.create({ data: { id: uuid(), name: 'Synthesiseur' } }),
  ])

  // Brands
  const brands = await Promise.all([
    prisma.brand.create({ data: { id: uuid(), name: 'Yamaha' } }),
    prisma.brand.create({ data: { id: uuid(), name: 'Roland' } }),
    prisma.brand.create({ data: { id: uuid(), name: 'Shure' } }),
  ])

  // Warehouses
  const warehouses = await Promise.all([
    prisma.warehouse.create({ data: { id: uuid(), name: 'Warehouse 1' } }),
    prisma.warehouse.create({ data: { id: uuid(), name: 'Warehouse 2' } }),
    prisma.warehouse.create({ data: { id: uuid(), name: 'Warehouse 3' } }),
  ])

  // Request Reasons
  const requestReasons = await Promise.all([
    prisma.requestReason.create({ data: { id: uuid(), name: 'Réparation' } }),
    prisma.requestReason.create({ data: { id: uuid(), name: 'Nettoyage' } }),
    prisma.requestReason.create({ data: { id: uuid(), name: 'Autre' } }),
  ])

  // Rental Reasons
  const rentalReasons = await Promise.all([
    prisma.rentalReason.create({ data: { id: uuid(), name: 'Spectacle' } }),
    prisma.rentalReason.create({ data: { id: uuid(), name: 'Répétition' } }),
    prisma.rentalReason.create({ data: { id: uuid(), name: 'Prêt externe' } }),
  ])

  console.log(`
    ------------------------------------
    ✅ Seed data inserted successfully!
    ------------------------------------
    👩🏻‍💻 Admin: ${admin.email}
    🎸 Categories: ${categories.length}
    🎨 Brands: ${brands.length}
    🏠 Warehouses: ${warehouses.length}
    📝 Request Reasons: ${requestReasons.length}
    📅 Rental Reasons: ${rentalReasons.length}
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
