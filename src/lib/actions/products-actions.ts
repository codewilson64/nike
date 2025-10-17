'use server'

import { PrismaClient } from "@prisma/client"

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
      orderBy: { createdAt: 'asc' },
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

export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        brand: true,
        gender: true,
        variants: {
          include: {
            color: true,
            size: true,
            images: true,
          },
        },
      },
    })

    if (!product) return null

    // Format the data for easy UI usage (like your Card)
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category?.name || 'Uncategorized',
      brand: product.brand?.name || '',
      gender: product.gender?.label || '',
      images: product.images.map((img) => img.url),
      variants: product.variants.map((v) => ({
        id: v.id,
        color: v.color?.name || '',
        colorHex: v.color?.hexCode || '#e5e5e5',
        size: v.size?.name || '',
        price: Number(v.price),
        salePrice: v.salePrice ? Number(v.salePrice) : undefined,
        inStock: v.inStock > 0,
        imageUrl: v.imageUrl || '/placeholder.png',
      })),
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
    throw new Error('Failed to fetch product details')
  }
}

export async function fetchSuggestedProducts(currentProductId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        NOT: { id: currentProductId },
      },
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
      take: 3,
    })

    return products.map((p) => ({
      id: p.id,
      image: p.images?.[0]?.url || '/placeholder.png',
      title: p.name,
      category: p.category?.name || 'Uncategorized',
      colors: p.variants.length,
      price: p.variants?.[0]?.price
        ? `$${Number(p.variants[0].price).toFixed(2)}`
        : '$0.00',
    }))
  } catch (error) {
    console.error('Error fetching suggested products:', error)
    return []
  }
}

export async function fetchProductsByGender(slug: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        gender: {
          slug: slug, // filters by gender slug (e.g., "men", "women", "kids")
        },
      },
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
      orderBy: { createdAt: "desc" },
    })

    // Format for card component or UI
    return products.map((p) => ({
      id: p.id,
      image: p.images?.[0]?.url || "/placeholder.png",
      title: p.name,
      category: p.category?.name || "Uncategorized",
      colors: p.variants.length,
      price: p.variants?.[0]?.price
        ? `$${Number(p.variants[0].price).toFixed(2)}`
        : "$0.00",
    }))
  } catch (error) {
    console.error(`Error fetching ${slug} products:`, error)
    throw new Error(`Failed to fetch ${slug} products`)
  }
}


