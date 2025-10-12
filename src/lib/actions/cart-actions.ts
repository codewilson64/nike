'use server'

import { PrismaClient } from "@prisma/client"
import { getCurrentUser } from "./auth-actions"

const prisma = new PrismaClient()

type CartItemProps = {
  productVariantId: string 
  quantity: number
}

export async function syncGuestCart(cartItems: CartItemProps[]) {
  const user = await getCurrentUser()
  const userId = user?.id

  if (!userId) return { success: false, message: 'Not logged in' }

  // 1. Find or create a cart for the logged user
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    })
  }

  // 2. Insert or update each item
  for (const item of cartItems) {
    const { productVariantId, quantity } = item

    const existing = cart.items.find((i) => i.productVariantId === productVariantId)

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId,
          quantity,
        },
      })
    }
  }

  return { success: true }
}


