'use server'

import { cookies } from 'next/headers'
import { PrismaClient, AddressType } from "@prisma/client"
import { getCurrentUser } from "./auth-actions"

const prisma = new PrismaClient()

type AddressFormData = {
  type: string
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  state: string
  country: string
  postalCode: string
  phone: string
  isDefault?: boolean
}

export async function saveAddress(formData: AddressFormData) {
  try {
    const user = await getCurrentUser()

    let userId: string | null = null
    let guestId: string | null = null

    if (user) {
      userId = user.id
    } else {
      // If not logged in, find guest from existing session token
      const cookieStore = await cookies()
      const sessionToken = cookieStore.get('guest_session')?.value

      if (!sessionToken) {
        throw new Error('Guest session not found')
      }

      const guest = await prisma.guest.findUnique({
        where: { sessionToken },
      })

      if (!guest) {
       throw new Error('Guest not found in database')
      }

      guestId = guest.id
    }

    // Save address
    const newAddress = await prisma.address.create({
      data: {
        ...formData,
        type: formData.type as AddressType,
        userId,
        guestId,
        phone: String(formData.phone),
      },
    })

    return { success: true, address: newAddress }
  } catch (err) {
    console.error('Error saving address:', err)
    return { success: false, error: 'Failed to save address' }
  }
}