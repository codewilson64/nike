import { PrismaClient } from 'generated/prisma'
const prisma = new PrismaClient()

export default async function seedProducts() {
  console.log('🌱 Seeding products...')

  const nike = await prisma.brand.findFirst({ where: { slug: 'nike' } })
  const shoes = await prisma.category.findFirst({ where: { slug: 'shoes' } })
  const men = await prisma.gender.findFirst({ where: { slug: 'men' } })
  const women = await prisma.gender.findFirst({ where: { slug: 'women' } })
  const unisex = await prisma.gender.findFirst({ where: { slug: 'unisex' } })

  if (!nike || !shoes || !men || !women || !unisex) {
    console.error('⚠️ Missing brand, category, or gender. Run base seeds first.')
    return
  }

  await prisma.product.createMany({
    data: [
      // 👟 Men’s Nike Products
      {
        name: 'Nike Pegasus 41',
        description: "Responsive cushioning in the Pegasus provides an energised ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max 90',
        description: "Lace up and feel the legacy. Produced at the cross section of art, music and culture, this champion running shoe helped define the '90s.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Air Jordan 1 Low',
        description: "The Air Jordan 1 Low sets you up with a piece of Jordan history and heritage that's comfortable all day.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max Moto 2K',
        description: "Familiar yet fresh, the Air Max Moto 2K is ready to go for a ride. Metallic accents complement performance-inspired details and Max Air cushioning.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max Muse',
        description: "The Air Max Muse is a bold, futuristic addition to the Air Max family. Its exaggerated proportions, sleek finishes and unexpectedly high arch showcase the shoe's namesake Air technology.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Alphafly 3',
        description: "Fine-tuned for marathon speed, the Alphafly 3 helps push you beyond what you thought possible.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max Plus',
        description: "Let your attitude have the edge in the Air Max Plus. Its iconic caging adds heat to your look while airy mesh keeps you cool.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Metcon 10',
        description: "Power your cross-training potential with the Metcon 10. It optimises stability for your heavier lifts with an ultra-strong Hyperlift plate and levels up mobility with responsive ReactX foam.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Free Metcon 6',
        description: "From power lifts to ladders, from grass blades to grainy platforms, from the turf to the track, your workout has a certain purpose, a specific focus.",
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Nike products seeded successfully!')
}

seedProducts()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
