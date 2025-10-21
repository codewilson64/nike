'use server'

import { PrismaClient } from "@prisma/client"
import { getCurrentUser } from "./auth-actions"
import { cookies } from "next/headers"
import midtransClient from "midtrans-client"

const prisma = new PrismaClient()

export async function createOrderCheckout(addressId: string) {
  const user = await getCurrentUser()
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('guest_session')?.value

  const guest = await prisma.guest.findUnique({
    where: { sessionToken },
  })

  if (!guest && !user) {
    throw new Error("No valid session found.")
  }

  // 1️⃣ Fetch the selected address (for shipping details)
  const address = await prisma.address.findFirst({
    where: { id: addressId },
  })

  if (!address) {
    throw new Error("Address not found.")
  }

  // 2️⃣ Fetch cart (user or guest)
  const cart = user
    ? await prisma.cart.findFirst({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                  color: true,
                  size: true,
                },
              },
            },
          },
        },
      })
    : await prisma.cart.findFirst({
        where: { guestId: guest?.id },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                  color: true,
                  size: true,
                },
              },
            },
          },
        },
      })

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty")
  }

  const subTotal = cart.items.reduce(
    (sum, item) => sum + Math.round(Number(item.variant.salePrice ?? item.variant.price)) * item.quantity,
    0 )

  const DELIVERY_FEE = 2;

  const totalAmount = subTotal + DELIVERY_FEE

  // 3️⃣ Create the Order
  const order = await prisma.order.create({
    data: {
      userId: user?.id || null,
      guestId: user ? null : cart.guestId,
      totalAmount,
      shippingAddressId: addressId,
      billingAddressId: addressId,
      items: {
        create: cart.items.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          priceAtPurchase: item.variant.salePrice ?? item.variant.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
              color: true,
              size: true,
            },
          },
        },
      },
    },
  })

  // 4️⃣ Prepare item details for Midtrans
  const itemDetails = order.items.map((item) => ({
    id: item.variant.sku,
    price: Math.round(Number(item.priceAtPurchase)),
    quantity: item.quantity,
    name: `${item.variant.product.name} - ${item.variant.color.name} - Size ${item.variant.size.name}`,
  }))
  
  itemDetails.push({
    id: "DELIVERY_FEE",
    price: Math.round(DELIVERY_FEE),
    quantity: 1,
    name: "Delivery Fee",
  });

  // 5️⃣ Initialize Midtrans Snap
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  })

  const parameter = {
    transaction_details: {
      order_id: order.id,
      gross_amount: totalAmount,
    },
    item_details: itemDetails,
    customer_details: {
      first_name: address.firstName,
      last_name: address.lastName,
      email: address.email ?? "guest@example.com",
      phone: address.phone,
      shipping_address: {
        first_name: address.firstName,
        last_name: address.lastName,
        address: `${address.line1}${address.line2 ? ", " + address.line2 : ""}`,
        city: address.city,
        postal_code: address.postalCode,
        phone: address.phone,
        country_code: "IDN",
      },
    },
  }

  // 6️⃣ Create Snap transaction
  const transaction = await snap.createTransaction(parameter)

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      method: 'pending', // will get updated by midtrans webhook
      provider: 'midtrans',
    },
  })


  // 7️⃣ Return order + Snap info to frontend
  return {
    success: true,
    orderId: order.id,
    paymentId: payment.id,
    snapToken: transaction.token,
    snapUrl: transaction.redirect_url,
    totalAmount: Number(order.totalAmount),
  }
}


