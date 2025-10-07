'use server'

import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function fetchAllProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      include: {
        images: true,
        category: true,
        variants: {
          select: {
            color: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    console.log(products)

    // Format the products for your Card component
    return products.map((p) => ({
      id: p.id,
      image: p.images?.[0]?.url || '/placeholder.png',
      title: p.name,
      category: p.category?.name || 'Uncategorized',
      colors: p.variants.length,
      price: p.variants?.[0]?.price
        ? `$${Number(p.variants[0].price).toFixed(2)}`
        : '$0.00',
    //   badge: getBadge(p), // optional badge (Best Seller, New Arrival, etc.)
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}
