'use client'

import Image from 'next/image'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCartStore } from 'app/zustand/useCartStore'
import { addGuestCartItem, decreaseGuestCartItem, removeCartItem } from 'lib/actions/cart-actions'
import CartTotals from 'components/CartTotals'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore()

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0)
  const delivery = 2
  const total = subtotal + delivery

  console.log("Cart: ",cart)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-8">
        <h2 className="text-heading-3 text-dark-900 mb-4">Your bag</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id + item.size}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 self-center sm:self-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                  <h2 className="font-semibold text-base sm:text-lg">{item.name}</h2>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-gray-500 text-sm">Size {item.size}</p>

                  <div className="flex items-center gap-3 mt-3 border rounded-full w-fit px-3 py-1">
                    <button
                      onClick={async () => {
                        decreaseQuantity(item.id)
                        try {
                          await decreaseGuestCartItem(item.id)
                        } catch (err) {
                          console.error("Failed to decrease guest cart:", err)
                        }
                      }}
                      className="p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={async () => {
                        increaseQuantity(item.id) 
                        try {
                          await addGuestCartItem(item.id, 1) 
                        } catch (err) {
                          console.error("Failed to update guest cart:", err)
                        }
                      }}
                      className="p-1"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="flex justify-between sm:flex-col sm:items-end w-full sm:w-auto">
                <p className="text-base sm:text-lg font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={async () => {
                    removeFromCart(item.id) 
                      try {
                        await removeCartItem(item.id) 
                      } catch (err) {
                        console.error("Failed to remove guest cart item:", err)
                      }
                    }}
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-3"
                >
                  <Trash2 className="w-5 h-5 inline" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="lg:col-span-2 bg-white shadow-sm rounded-2xl p-6 h-fit sticky top-4">
        <h2 className="text-lg font-semibold mb-6">Summary</h2>

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
    </div>
  )
}
