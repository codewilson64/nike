'use client'

import { useState } from "react";
import { Menu, X, Search, ShoppingCart, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "app/zustand/useCartStore";

const NavLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

type User = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null
} | null

type CartData = {
  quantity: number
}

export default function Navbar({ user, items }: { user: User, items: CartData }) {
  const [isOpen, setIsOpen] = useState(false);
  // Access cart items from Zustand
  const cart = useCartStore((state) => state.cart)
  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="w-full border-b border-light-300 bg-dark-900 font-jost">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href={'/'} className="flex-shrink-0 text-2xl font-extrabold text-light-100">
            {/* <Image
              src="/logo.svg"
              alt="Nike Logo"
              width={100}
              height={24}
              className="h-6 w-auto"
            /> */}
              STEPFUEL
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-body-medium text-light-200">
            {NavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-light-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6 text-body-medium text-light-200">
            <button className="flex items-center gap-1 hover:text-light-100">
              <Search className="w-4 h-4" />
            </button>
            <Link href={'/cart'}>
              <button className="flex items-center gap-1 hover:text-light-100">
                <ShoppingCart className="w-4 h-4" />
                  {items.quantity > 0 && (
                  <span className="text-light-100">
                    ({items.quantity})
                  </span>
                )}
              </button>
            </Link>

            <Link href={user ? "/profile" : "/sign-in"}>
              <button className="flex items-center gap-1 hover:text-light-100">
                <CircleUserRound className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-100 hover:text-light-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 text-body-medium text-light-100">
          {NavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block hover:text-light-100"
            >
              {link.label}
            </Link>
          ))}
          <Link href={user ? "/profile" : "/sign-in"} className="block w-full text-left hover:text-light-100">
              Account
          </Link>
          <Link href='/cart' className="block w-full text-left hover:text-light-100">
            My Cart {totalQuantity > 0 && `(${totalQuantity})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
