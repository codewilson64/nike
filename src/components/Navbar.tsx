'use client'

import { useState } from "react";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <a href="#" className="hover:text-light-100">Men</a>
            <a href="#" className="hover:text-light-100">Women</a>
            <a href="#" className="hover:text-light-100">Kids</a>
            <a href="#" className="hover:text-light-100">Collections</a>
            <a href="#" className="hover:text-light-100">Contact</a>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6 text-body-medium text-light-200">
            <button className="flex items-center gap-1 hover:text-light-100">
              <Search className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 hover:text-light-100">
              <ShoppingCart className="w-4 h-4" />
                (2)
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-900 hover:text-light-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 text-body-medium text-dark-900">
          <a href="#" className="block hover:text-light-100">Men</a>
          <a href="#" className="block hover:text-light-100">Women</a>
          <a href="#" className="block hover:text-light-100">Kids</a>
          <a href="#" className="block hover:text-light-100">Collections</a>
          <a href="#" className="block hover:text-light-100">Contact</a>
          <button className="block w-full text-left hover:text-light-100">Search</button>
          <button className="block w-full text-left hover:text-light-100">My Cart (2)</button>
        </div>
      )}
    </nav>
  );
}
