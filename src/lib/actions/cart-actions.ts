'use server'

import { cookies } from 'next/headers'
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

export const addGuestCartItem = async (productVariantId: string, quantity: number) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("guest_session")?.value;

  if (!sessionToken) {
    throw new Error("Guest session not found. Please create one first.");
  }

  // Find the guest
  const guest = await prisma.guest.findUnique({
    where: { sessionToken },
  });

  if (!guest) {
    throw new Error("Guest not found for this session.");
  }

  // Find or create the cart for this guest
  let cart = await prisma.cart.findFirst({
    where: { guestId: guest.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { guestId: guest.id },
    });
  }

  // Check if the product already exists in the cart
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productVariantId,
    },
  });

  if (existingItem) {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // Add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productVariantId,
        quantity,
      },
    });
  }

  return { ok: true, message: "Item added to guest cart." };
}

export const decreaseGuestCartItem = async (productVariantId: string) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("guest_session")?.value;

  if (!sessionToken) throw new Error("Guest session not found.");

  const guest = await prisma.guest.findUnique({ where: { sessionToken } });
  if (!guest) throw new Error("Guest not found for this session.");

  const cart = await prisma.cart.findFirst({ where: { guestId: guest.id } });
  if (!cart) return;

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productVariantId },
  });

  if (!existingItem) return;

  if (existingItem.quantity > 1) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity - 1 },
    });
  } else {
    await prisma.cartItem.delete({
      where: { id: existingItem.id },
    });
  }

  return { ok: true };
};

export const removeCartItem = async (productVariantId: string) => {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('guest_session')?.value

    if (!sessionToken) throw new Error('No guest session found')

    const guest = await prisma.guest.findUnique({
      where: { sessionToken },
    })

    if (!guest) throw new Error('Guest not found')

    const cart = await prisma.cart.findFirst({ where: { guestId: guest.id } });
    if (!cart) return;

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productVariantId },
    })

    if (!existingItem) return;

    await prisma.cartItem.deleteMany({
      where: { id: existingItem.id },
    })

    return { ok: true }
  } catch (error) {
    console.error('❌ Failed to remove item:', error)
    return { ok: false, error: (error as Error).message }
  }
}


