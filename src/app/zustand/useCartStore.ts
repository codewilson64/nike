'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: string
  name: string
  category: string
  size: string
  quantity: number
  price: number
  salePrice?: number
  image: string
}

type CartStore = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  cart: [],

      addToCart: (item) => {
        const existingItem = get().cart.find(
          (i) => i.id === item.id && i.size === item.size
        )
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          set({ cart: [...get().cart, item] })
        }
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),

      increaseQuantity: (id) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          cart: get()
            .cart
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'guest-cart', // key name in localStorage
    }
  )
)
