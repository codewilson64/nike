'use server'

import { PrismaClient, Prisma } from '@/generated/prisma'
const prisma = new PrismaClient()

export async function filterProducts({
  gender,
  size,
  sortBy, 
}: {
  gender?: string
  size?: string
  sortBy?: 'highest' | 'lowest' | ''
}) {
  const where: Prisma.ProductWhereInput = {
    isPublished: true,
  }

  // ✅ Gender filter
  if (gender) {
    where.gender = { label: gender }
  }

  // ✅ Build variant filters
  const variantConditions: Prisma.ProductVariantWhereInput = {}

  if (size) variantConditions.size = { name: size }

  // ✅ Query
  const products = await prisma.product.findMany({
    where,
    include: {
      images: true,
      category: true,
      gender: true,
      variants: {
        select: {
          price: true,
          salePrice: true,
          size: true,
        },
      },
    },
  })

  // ✅ Format results and compute price for sorting
  const formatted = products.map((p) => {
    const v = p.variants?.[0]
    const value = v?.salePrice ?? v?.price ?? 0
    return {
      id: p.id,
      image: p.images?.[0]?.url || '/placeholder.png',
      title: p.name,
      category: p.category?.name || 'Uncategorized',
      colors: p.variants.length,
      price: `$${Number(value).toFixed(2)}`,
      numericPrice: Number(value),
    }
  })

  // ✅ Sort by price if specified
  if (sortBy === 'highest') {
    formatted.sort((a, b) => b.numericPrice - a.numericPrice)
  } else if (sortBy === 'lowest') {
    formatted.sort((a, b) => a.numericPrice - b.numericPrice)
  }

  return formatted
}
