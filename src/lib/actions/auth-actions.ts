'use server'

import { auth } from '../auth'
import { headers } from 'next/headers'

// sign up
export const signUp = async (name: string, email: string, password: string ) => {
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: '/'
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
      callbackURL: '/'
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
  const response = await auth.api.signOut({headers: await headers()})

  return response
}
