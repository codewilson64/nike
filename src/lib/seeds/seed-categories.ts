import { PrismaClient } from "generated/prisma"
const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Running shoes', slug: 'running-shoes' },
      { name: 'Lifestyle', slug: 'lifestyle' },
      { name: 'Kids', slug: 'kids' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Categories seeded successfully!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
