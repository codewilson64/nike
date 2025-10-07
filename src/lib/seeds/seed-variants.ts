// prisma/seedProductVariants.ts
import { PrismaClient, Prisma } from '@/generated/prisma'
const prisma = new PrismaClient()

export default async function seedProductVariants() {
  console.log('🌱 Seeding product variants...')

  // Fetch all base data
  const colors = await prisma.color.findMany({
    where: { slug: { in: ['white', 'black', 'red', 'blue', 'green', 'gray'] } },
  })
  const sizes = await prisma.size.findMany({
    where: { slug: { in: ['7', '8', '9', '10', '11', '12'] } },
  })
  const products = await prisma.product.findMany({
    where: { isPublished: true },
  })

  if (colors.length < 6 || sizes.length < 6 || products.length < 15) {
    console.error('⚠️ Missing required colors, sizes, or products. Run base seeds first.')
    return
  }

  const variants: Prisma.ProductVariantCreateManyInput[] = []

  for (const product of products) {
    // Take first 6 colors and sizes as combinations
    const colorCombos = colors.slice(0, 6)
    const sizeCombos = sizes.slice(0, 6)

    for (let i = 0; i < 6; i++) {
      const color = colorCombos[i]
      const size = sizeCombos[i]
      const sku = `${product.name.replace(/\s+/g, '-').toUpperCase()}-${color.slug.toUpperCase()}-${size.slug}`

      variants.push({
        productId: product.id,
        sku,
        price: new Prisma.Decimal(120 + Math.random() * 50), // price between 120–170
        salePrice: new Prisma.Decimal(100 + Math.random() * 40), // sale between 100–140
        colorId: color.id,
        sizeId: size.id,
        inStock: Math.floor(Math.random() * 50) + 10, // random 10–60
        weight: 1.2 + Math.random() * 0.3, // random weight between 1.2–1.5 kg
        dimensions: {
          length: 30 + Math.floor(Math.random() * 5),
          width: 20 + Math.floor(Math.random() * 3),
          height: 12 + Math.floor(Math.random() * 3),
        },
      })
    }
  }

  await prisma.productVariant.createMany({
    data: variants,
    skipDuplicates: true,
  })

  console.log(`✅ Created ${variants.length} product variants successfully!`)
}

seedProductVariants()
  .catch((e) => {
    console.error('❌ Error seeding product variants:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
