import { PrismaClient, Prisma } from 'generated/prisma'
const prisma = new PrismaClient()

export default async function seedProductVariants() {
  console.log('🧩 Seeding product variants...')

  const products = await prisma.product.findMany()
  const colors = await prisma.color.findMany()
  const sizes = await prisma.size.findMany()

  // Define which colors each product should have
  const productColorMap: Record<string, string[]> = {
    'NIKE FREE METCON 6': ['brown', 'green', 'orange', 'black', 'blue'],
  }

  // Define example images per color (replace with your real CDN or public folder URLs)
  const colorImageMap: Record<string, string> = {
    black: '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var1.avif',
    green: '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var2.avif',
    blue: '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var3.avif',
    brown: '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var4.avif',
    orange: '/shoes/nike_free_metcon_6/NIKE+FREE+METCON+6-var5.avif',
  }

  const variants: Prisma.ProductVariantCreateManyInput[] = []

  for (const product of products) {
    const allowedColorSlugs = productColorMap[product.name.toUpperCase()] || []

    const productColors = colors.filter((c) =>
      allowedColorSlugs.includes(c.slug)
    )

    if (productColors.length === 0) {
      console.log(`⚠️  No matching colors for ${product.name}, skipping.`)
      continue
    }

    // Use up to 6 sizes
    const sizeCombos = sizes.slice(0, 6)

    for (const color of productColors) {
      // Generate one consistent price per colorway
      const basePrice = new Prisma.Decimal(120 + Math.random() * 50)
      const salePrice = new Prisma.Decimal(
        basePrice.toNumber() - (10 + Math.random() * 20)
      )

      // Assign image URL based on color
      const imageUrl = colorImageMap[color.slug] || '/images/default-shoe.png'

      for (const size of sizeCombos) {
        const sku = `${product.name.replace(/\s+/g, '-').toUpperCase()}-${color.slug.toUpperCase()}-${size.slug.toUpperCase()}`

        variants.push({
          productId: product.id,
          sku,
          price: basePrice,
          salePrice,
          colorId: color.id,
          sizeId: size.id,
          inStock: Math.floor(Math.random() * 50) + 10,
          weight: 1.2 + Math.random() * 0.3,
          dimensions: {
            length: 30 + Math.floor(Math.random() * 5),
            width: 20 + Math.floor(Math.random() * 3),
            height: 12 + Math.floor(Math.random() * 3),
          },
          imageUrl, // ✅ added here
        })
      }
    }
  }

  await prisma.productVariant.createMany({ data: variants })
  console.log(`✅ ${variants.length} product variants seeded successfully!`)
}

seedProductVariants()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
