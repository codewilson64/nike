'use server'

import { redirect } from 'next/navigation'
import { auth } from '../auth'
import { cookies, headers } from 'next/headers'
import { randomUUID } from 'crypto'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, 
};

// Create guest session
export const createGuestSession = async () => {
  const cookieStore = await cookies();
  const existing = cookieStore.get("guest_session");

  // If guest already has a session, return it
  if (existing?.value) {
    return { ok: true, sessionToken: existing.value };
  }
  
  // Generate new token and expiration date
  const sessionToken = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + COOKIE_OPTIONS.maxAge * 1000);

  // Store the new guest session in the database
  await prisma.guest.create({
    data: {
      sessionToken,
      expiresAt,
    },
  })

  // Set cookie for browser
  cookieStore.set("guest_session", sessionToken, COOKIE_OPTIONS)

  return { ok: true, sessionToken }
}

// Check Guest session
export const checkGuestSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_session")?.value;

  if (!token) {
    return { sessionToken: null };
  }

  const now = new Date();

  // Find guest record
  const guest = await prisma.guest.findUnique({
    where: { sessionToken: token },
  });

  // If expired, delete and return null
  if (guest && guest.expiresAt < now) {
    await prisma.guest.delete({
      where: { sessionToken: token },
    });
    return { sessionToken: null };
  }

  // Otherwise return the valid session token
  return { sessionToken: token };
}

// Migrate guest to user
export const migrateGuestToUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_session")?.value;
  if (!token) return

  // Get current logged-in user
  const user = await getCurrentUser();
  if (!user?.id) return

  // Find the guest record
  const guest = await prisma.guest.findUnique({
    where: { sessionToken: token },
    include: {
      carts: {
        include: { items: true },
      },
    },
  });

  if (!guest) {
    cookieStore.delete("guest_session");
    return { success: false, message: "Guest not found" };
  }

  const guestCartItems = guest.carts.flatMap((cart) => cart.items) || [];

  // Find or create a user cart
  let userCart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: { items: true },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: { userId: user.id },
      include: { items: true },
    });
  }

  // Merge guest items into user cart
  for (const item of guestCartItems) {
    const existing = userCart.items.find(
      (i) => i.productVariantId === item.productVariantId
    );

    if (existing) {
      // Update existing item quantity
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        },
      });
    }
  }
  // Delete guest carts and guest record
  await prisma.cart.deleteMany({
    where: { guestId: guest.id },
  })


  await prisma.guest.delete({
    where: { id: guest.id },
  });

  cookieStore.delete("guest_session");

  return { success: true, message: "Guest cart migrated successfully" };
};

// sign up
export const signUp = async (name: string, email: string, password: string ) => {
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    }
  })
  return response
}

// sign in
export const signIn = async (email: string, password: string ) => {
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    }
  })
  return response
}

// get user session 
export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers() 
  })
    return session?.user ?? null
  } catch (error) {
    console.log(error)
    return null
  }
} 

// sign out
export const signOut = async () => {
  await auth.api.signOut({headers: await headers()})
  redirect('/')
}
