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
  sameSite: "strict",
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
  const cookieStore = cookies();
  const token = (await cookieStore).get("guest_session")?.value;

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
  const cookieStore = cookies();
  const token = cookieStore.get("guest_session")?.value;
  if (!token) return

  await prisma.guest.delete({
    where: { sessionToken: token },
  });

  cookieStore.delete("guest_session");
}

// sign up
export const signUp = async (name: string, email: string, password: string ) => {
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    }
  })
  await migrateGuestToUser()
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
  await migrateGuestToUser()
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
