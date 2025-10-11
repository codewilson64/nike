import { PrismaClient } from "generated/prisma"
const prisma = new PrismaClient()

async function main() {
  await prisma.gender.createMany({
    data: [
      { label: 'Men', slug: 'men' },
      { label: 'Women', slug: 'women' },
      { label: 'Unisex', slug: 'unisex' },
      { label: 'Kids', slug: 'kids' },
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
