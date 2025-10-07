import { PrismaClient } from "@/generated/prisma"
const prisma = new PrismaClient()

async function main() {
  await prisma.brand.createMany({
    data: [
      { name: 'Nike', slug: 'nike' },
      { name: 'Adidas', slug: 'adidas' },
      { name: 'Puma', slug: 'puma' },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Brands seeded successfully!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
