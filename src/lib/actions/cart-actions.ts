'use server'

import { cookies } from 'next/headers'
import { PrismaClient } from "@prisma/client"
import { getCurrentUser } from "./auth-actions"
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// add guest/user items to database
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

  const variantExists = await prisma.productVariant.findUnique({
    where: { id: productVariantId },
  });
  if (!variantExists) {
    throw new Error("Invalid product variant ID.");
  }

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
  revalidatePath('/cart')

  return { ok: true, message: "Item added to guest cart." };
}

export const addUserCartItem = async (productVariantId: string, quantity: number) => {
  const user = await getCurrentUser()
  if (!user?.id) throw new Error('User not logged in')

  // Find or create a cart for the user
  let cart = await prisma.cart.findFirst({
    where: { userId: user.id },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    })
  }

  // Check if the item already exists
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productVariantId,
    },
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
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
  revalidatePath('/cart')

  return { ok: true, message: 'Item added to user cart.' }
}


// decrease guest/user items in database
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
  revalidatePath('/cart')

  return { ok: true };
};

export const decreaseUserCartItem = async (productVariantId: string) => {
  const user = await getCurrentUser()
  if (!user?.id) throw new Error('User not logged in')

  const cart = await prisma.cart.findFirst({ 
    where: { userId: user.id } 
  });
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
  revalidatePath('/cart')

  return { ok: true };
};


// remove guest/user items in database
export const removeGuestCartItem = async (productVariantId: string) => {
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
    revalidatePath('/cart')

    return { ok: true }
  } catch (error) {
    console.error('❌ Failed to remove item:', error)
    return { ok: false, error: (error as Error).message }
  }
}

export const removeUserCartItem = async (productVariantId: string) => {
  try {
    const user = await getCurrentUser()
    if (!user?.id) throw new Error('User not logged in')

    const cart = await prisma.cart.findFirst({ 
      where: { userId: user.id } 
    });
    if (!cart) return;

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productVariantId },
    })

    if (!existingItem) return;

    await prisma.cartItem.deleteMany({
      where: { id: existingItem.id },
    })
    revalidatePath('/cart')

    return { ok: true }
  } catch (error) {
    console.error('❌ Failed to remove item:', error)
    return { ok: false, error: (error as Error).message }
  }
}


// get guest/user cart items from database
export const getGuestCartItems = async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('guest_session')?.value

  if (!sessionToken) {
    return { ok: false, message: 'No guest session found', items: [] }
  }

  const guest = await prisma.guest.findUnique({
    where: { sessionToken },
    include: {
      carts: {
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      category: true
                    },
                  },
                  color: true,
                  size: true,
                },
              },
            },
            orderBy: {
              createdAt: 'asc', 
            },
          },
        },
      },
    },
  })

  if (!guest || guest.carts.length === 0) {
    return { ok: true, items: [] }
  }

  const items = guest.carts[0].items.map((item) => ({
    id: item.id,
    productVariantId: item.variant.id,
    quantity: item.quantity,
    price: item.variant.salePrice ? Number(item.variant.salePrice) : Number(item.variant.price),
    name: item.variant.product.name,
    category: item.variant.product.category?.name || 'Uncategorized',
    size: item.variant.size.name,
    color: item.variant.color.name,
    image: item.variant.imageUrl || '/placeholder.png',
  }))

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 2 
  const total = subtotal + delivery

  return { ok: true, items, subtotal, delivery, total }
}

export const getUserCartItems = async () => {
  const user = await getCurrentUser()
  if (!user?.id) throw new Error('User not logged in')

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
              color: true,
              size: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc', 
        },
      },
    },
  })

  // Handle case where user has no cart or no items
  if (!cart || cart.items.length === 0) {
    return { ok: true, items: [] }
  }

  // Format items for frontend
  const items = cart.items.map((item) => ({
    id: item.id,
    productVariantId: item.variant.id,
    quantity: item.quantity,
    price: item.variant.salePrice
      ? Number(item.variant.salePrice)
      : Number(item.variant.price),
    name: item.variant.product.name,
    category: item.variant.product.category?.name || 'Uncategorized',
    size: item.variant.size.name,
    color: item.variant.color.name,
    image: item.variant.imageUrl || '/placeholder.png',
  }))

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 2
  const total = subtotal + delivery

  return { ok: true, items, subtotal, delivery, total }
}





