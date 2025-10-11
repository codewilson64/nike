import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function seedImages() {
  console.log('🖼️ Seeding product images...')

  const products = await prisma.product.findMany()
  const imageFiles = [
    '/shoes/shoe-1.jpg',
    '/shoes/shoe-2.webp',
    '/shoes/shoe-3.webp',
    '/shoes/shoe-4.webp',
    '/shoes/shoe-5.avif',
    '/shoes/shoe-6.avif',
    '/shoes/shoe-7.avif',
    '/shoes/shoe-8.avif',
    '/shoes/shoe-9.avif',
    '/shoes/shoe-10.avif',
    '/shoes/shoe-11.avif',
    '/shoes/shoe-12.avif',
    '/shoes/shoe-13.avif',
    '/shoes/shoe-14.avif',
    '/shoes/shoe-15.avif',
  ]

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const img = imageFiles[i % imageFiles.length]

    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: img,
        sortOrder: 0,
        isPrimary: true,
      },
    })
  }

  console.log('✅ Product images seeded successfully!')
}

seedImages()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
