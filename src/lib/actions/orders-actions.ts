'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface CartItemInput {
  variantId: string
  quantity: number
  price: number
}

interface CreateOrderInput {
  userId: string
  cartItems: CartItemInput[]
  shippingAddressId?: string
  billingAddressId?: string
}

export async function createOrder({
  userId,
  cartItems,
  shippingAddressId,
  billingAddressId,
}: CreateOrderInput) {
  if (!userId || cartItems.length === 0) {
    throw new Error('Missing user or cart items')
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      shippingAddressId,
      billingAddressId,
      items: {
        create: cartItems.map((item) => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  })

  return order
}
