import { PrismaClient } from 'generated/prisma'
const prisma = new PrismaClient()

export default async function seedImages() {
  console.log('🖼️ Seeding images...')

  // 1️⃣ Find the product
  const product = await prisma.product.findFirst({
    where: {
      name: {
        equals: 'Nike Free Metcon 6',
        mode: 'insensitive', // ignore case differences
      },
    },
  })

  if (!product) {
    console.error('❌ Product not found.')
    return
  }

  // 2️⃣ List all image paths
  const imageFiles = [
    '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var1.avif',
    '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var2.avif',
    '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var3.avif',
    '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var4.avif',
    '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var5.avif',
  ]

  // 3️⃣ Check if images already exist
  const existing = await prisma.productImage.findMany({
    where: { productId: product.id },
  })

  if (existing.length > 0) {
    console.log(`⏩ Skipping — ${existing.length} images already exist.`)
    return
  }

  // 4️⃣ Seed new images
  const imageData = imageFiles.map((url, index) => ({
    productId: product.id,
    url,
    sortOrder: index,
    isPrimary: index === 0, // first image as primary
  }))

  await prisma.productImage.createMany({
    data: imageData,
    skipDuplicates: true,
  })

  console.log(`✅ Seeded ${imageFiles.length} images successfully!`)
}

seedImages()
  .catch((e) => {
    console.error('❌ Error seeding images:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
