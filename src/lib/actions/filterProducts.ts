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

  // Gender filter
  if (gender) {
    where.gender = {
      label: gender,
    }
  }

  // Build variant filters
  const variantConditions: any = {}

  if (size) {
    variantConditions.size = { name: size }
  }

  if (color) {
    variantConditions.color = { name: color }
  }

  if (priceRange) {
    let priceFilter: any = {}
    switch (priceRange) {
      case '0-50':
        priceFilter = {
          OR: [
            { salePrice: { gte: new Prisma.Decimal(0), lte: new Prisma.Decimal(50) } },
            { salePrice: null, price: { gte: new Prisma.Decimal(0), lte: new Prisma.Decimal(50) } },
          ],
        }
        break
      case '50-100':
        priceFilter = {
          OR: [
            { salePrice: { gte: new Prisma.Decimal(50), lte: new Prisma.Decimal(100) } },
            { salePrice: null, price: { gte: new Prisma.Decimal(50), lte: new Prisma.Decimal(100) } },
          ],
        }
        break
      case '100-150':
        priceFilter = {
          OR: [
            { salePrice: { gte: new Prisma.Decimal(100), lte: new Prisma.Decimal(150) } },
            { salePrice: null, price: { gte: new Prisma.Decimal(100), lte: new Prisma.Decimal(150) } },
          ],
        }
        break
      case '150+':
        priceFilter = {
          OR: [
            { salePrice: { gte: new Prisma.Decimal(150) } },
            { salePrice: null, price: { gte: new Prisma.Decimal(150) } },
          ],
        }
        break
      default:
        priceFilter = {}
    }
    variantConditions.AND = variantConditions.AND
      ? [...variantConditions.AND, priceFilter]
      : [priceFilter]
  }

  // Apply variants.some only if there are variant conditions
  if (Object.keys(variantConditions).length > 0) {
    where.variants = { some: variantConditions }
  }

  // Query products
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

  // Format output
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