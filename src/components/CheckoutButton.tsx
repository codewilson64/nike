'use client'

import { useCartStore } from "app/zustand/useCartStore"
import { createOrder } from "lib/actions/orders-actions"

export default function CheckoutButton({ userId }: { userId: string }) {
  const { cart, clearCart } = useCartStore()

  async function handleCheckout() {
    try {
      const order = await createOrder({
        userId,
        cartItems: cart.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      clearCart()
      console.log('✅ Order created:', order)
    } catch (error) {
      console.error('❌ Checkout failed:', error)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-900 transition"
    >
      Checkout
    </button>
  )
}
