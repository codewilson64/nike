import { PrismaClient } from "generated/prisma"
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding...")
  await prisma.size.createMany({
    data: [
      { name: '7', slug: '7', sortOrder: 0 },
      { name: '8', slug: '8', sortOrder: 1 },
      { name: '9', slug: '9', sortOrder: 2 },
      { name: '10', slug: '10', sortOrder: 3 },
      { name: '11', slug: '11', sortOrder: 4 },
      { name: '12', slug: '12', sortOrder: 5 },
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
