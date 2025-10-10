'use client'

import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/app/zustand/useCartStore";

const GENDERS = [
  { label: "Men", slug: "men" },
  { label: "Women", slug: "women" },
  { label: "Kids", slug: "kids" },
]

export default function Navbar() {
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
          <Link
            href={'/'}
            className="flex-shrink-0">
            <img
              src="/logo.svg"
              alt="Nike Logo"
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-body-medium text-light-200">
            {GENDERS.map((gender) => (
              <Link
                key={gender.slug}
                href={`/gender/${gender.slug}`}
                className="hover:text-light-100"
              >
                {gender.label}
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
                  {totalQuantity > 0 && (
                  <span className="text-light-100">
                    ({totalQuantity})
                  </span>
                )}
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
          {GENDERS.map((gender) => (
            <Link
              key={gender.slug}
              href={`/gender/${gender.slug}`}
              className="block hover:text-light-100"
            >
              {gender.label}
            </Link>
          ))}
          <button className="block w-full text-left hover:text-light-100">Search</button>
          <button className="block w-full text-left hover:text-light-100">
            My Cart {totalQuantity > 0 && `(${totalQuantity})`}
          </button>
        </div>
      )}
    </nav>
  );
}
