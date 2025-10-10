'use server'

import { PrismaClient, Prisma } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function filterProducts({
  gender,
  size,
  color,
  priceRange,
}: {
  gender?: string
  size?: string
  color?: string
  priceRange?: string
}) {
  const where: any = {
    isPublished: true,
  }

  // ✅ Gender filter
  if (gender) {
    where.gender = {
      label: gender,
    }
  }

  // ✅ Build variant filters safely
  const variantConditions: any = {}

  if (size) {
    variantConditions.size = { name: size }
  }

  if (color) {
    variantConditions.color = { name: color }
  }

  if (priceRange) {
    // normalize
    const cleaned = priceRange.replace(/\$/g, '').replace(/\s/g, '').toLowerCase()

    if (cleaned.includes('over') || cleaned.includes('+')) {
      const num = parseFloat(cleaned.replace(/[^0-9.]/g, ''))
      // check salePrice or price
      variantConditions.OR = [
        { salePrice: { gt: new Prisma.Decimal(num) } },
        { price: { gt: new Prisma.Decimal(num) } },
      ]
    } else if (cleaned.includes('-')) {
      const [min, max] = cleaned.split('-').map(Number)
      variantConditions.OR = [
        {
          salePrice: {
            gte: new Prisma.Decimal(min),
            lte: new Prisma.Decimal(max),
          },
        },
        {
          price: {
            gte: new Prisma.Decimal(min),
            lte: new Prisma.Decimal(max),
          },
        },
      ]
    }
  }

  // ✅ Apply variants.some only if something to filter
  if (Object.keys(variantConditions).length > 0) {
    where.variants = { some: variantConditions }
  }

  // ✅ Query products
  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      images: true,
      category: true,
      gender: true,
      variants: {
        select: {
          color: true,
          price: true,
          salePrice: true,
        },
      },
    },
  })

  // ✅ Format output
  return products.map((p) => ({
    id: p.id,
    image: p.images?.[0]?.url || '/placeholder.png',
    title: p.name,
    category: p.category?.name || 'Uncategorized',
    colors: p.variants.length,
    price: (() => {
      const v = p.variants?.[0]
      const value = v?.salePrice ?? v?.price ?? 0
      return `$${Number(value).toFixed(2)}`
    })(),
  }))
}
