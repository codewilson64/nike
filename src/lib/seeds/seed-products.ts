import { PrismaClient } from '@/generated/prisma'
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
        name: 'Nike Air Force 1 Low',
        description: 'Classic white sneakers made for everyday comfort and timeless style.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max 90',
        description: 'A modern twist on a retro running silhouette with visible Air cushioning.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Zoom Freak 5',
        description: 'Basketball shoes built for power and agility, inspired by Giannis Antetokounmpo.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Pegasus 41',
        description: 'Versatile running shoes that blend responsiveness with durability for daily training.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },
      {
        name: 'Nike Dunk Low Retro',
        description: 'Iconic streetwear sneakers that combine basketball heritage with urban fashion.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: men.id,
        isPublished: true,
      },

      // 👟 Women’s Nike Products
      {
        name: 'Nike Air Max 270 React',
        description: 'Lightweight sneakers with a bold design and soft cushioning for all-day comfort.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Court Vision Alta',
        description: 'Elevated women’s sneakers that blend sport inspiration with lifestyle comfort.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Zoom Pegasus 41 FlyEase',
        description: 'Easy-on women’s running shoes with FlyEase technology for convenience and comfort.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Blazer Mid ’77 Vintage',
        description: 'Retro-inspired sneakers that pair classic design with modern materials.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },
      {
        name: 'Nike Free RN 5.0',
        description: 'Minimalist running shoes for natural movement and flexibility during light runs.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: women.id,
        isPublished: true,
      },

      // 👟 Unisex Nike Products
      {
        name: 'Nike Air Jordan 1 Mid',
        description: 'The legendary sneaker that transcends sport, available for all genders.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: unisex.id,
        isPublished: true,
      },
      {
        name: 'Nike Air Max 1 Essential',
        description: 'The original visible Air shoe — stylish, iconic, and perfect for everyone.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: unisex.id,
        isPublished: true,
      },
      {
        name: 'Nike SB Dunk Low',
        description: 'Skateboard-ready sneakers that combine cushioning, grip, and everyday comfort.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: unisex.id,
        isPublished: true,
      },
      {
        name: 'Nike Waffle Trainer 2',
        description: 'Vintage running shoes reborn for everyday wear with a classic waffle outsole.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: unisex.id,
        isPublished: true,
      },
      {
        name: 'Nike React Infinity Run Flyknit',
        description: 'Soft, springy cushioning designed to reduce injury and keep you running longer.',
        brandId: nike.id,
        categoryId: shoes.id,
        genderId: unisex.id,
        isPublished: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ 15 Nike products seeded successfully!')
}

seedProducts()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
