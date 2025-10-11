import { PrismaClient } from "generated/prisma"
const prisma = new PrismaClient()

async function main() {
  await prisma.color.createMany({
    data: [
      { name: 'Black', slug: 'black', hexCode: '#000000' },
      { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
      { name: 'Red', slug: 'red', hexCode: '#FF0000' },
      { name: 'Blue', slug: 'blue', hexCode: '#1E3A8A' },
      { name: 'Green', slug: 'green', hexCode: '#10B981' },
      { name: 'Gray', slug: 'gray', hexCode: '#6B7280' },
      { name: 'Brown', slug: 'brown', hexCode: '#8B4513' },
      { name: 'Baroque Brown', slug: 'baroque_brown', hexCode: '#4E3524' },
      { name: 'Pink', slug: 'pink' },
      { name: 'Gold', slug: 'gold' },
      { name: 'Silver', slug: 'silver' },
      { name: 'Orange', slug: 'orange' },
      { name: 'Lemon Venom', slug: 'lemon_venom' },
      { name: 'Campfire Orange', slug: 'campfire_orange' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Seeded successfully!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
