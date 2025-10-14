'use client'

import { useCartStore } from 'app/zustand/useCartStore'
import Image from 'next/image'
import Link from 'next/link'

type CheckoutProps = {
  items: {
    id: string
    name: string
    image: string
    size: string
    color: string
    quantity: number
    price: number
  }[]
}

export default function CartTotals({ items }: CheckoutProps) {
  const { cart } = useCartStore()

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 2
  const total = subtotal + delivery

  return (
    <div className="lg:col-span-2 bg-white shadow-sm ring-1 ring-gray-100 rounded-2xl p-6 h-fit sticky top-4">
        <h2 className="text-lg font-semibold mb-6">Summary</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between pb-6 items-start"
            >
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  <p className="text-gray-500 text-sm">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Quantity: x {item.quantity}</p>
                </div>
              </div>
              <p>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}

        <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-700 mb-4 text-sm sm:text-base">
          <span>Estimated Delivery & Handling</span>
          <span>${delivery.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold mt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link href={'/checkouts'}>
          <button className="mt-6 w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition text-sm sm:text-base">
            Proceed to Checkout
          </button>
        </Link>
      </div>
  )
}
