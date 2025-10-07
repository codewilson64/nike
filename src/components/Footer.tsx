import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 font-jost">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 sm:grid-cols-6 gap-8">
        {/* Logo */}
        <div>
          <Image src="/logo.svg" alt="Nike Logo" width={50} height={50} />
        </div>

        {/* Featured */}
        <div>
          <h4 className="text-white font-semibold mb-3">Featured</h4>
          <ul className="space-y-2">
            <li>Air Force 1</li>
            <li>Huarache</li>
            <li>Air Max 90</li>
            <li>Air Max 95</li>
          </ul>
        </div>

        {/* Shoes */}
        <div>
          <h4 className="text-white font-semibold mb-3">Shoes</h4>
          <ul className="space-y-2">
            <li>All Shoes</li>
            <li>Custom Shoes</li>
            <li>Jordan Shoes</li>
            <li>Running Shoes</li>
          </ul>
        </div>

        {/* Clothing */}
        <div>
          <h4 className="text-white font-semibold mb-3">Clothing</h4>
          <ul className="space-y-2">
            <li>All Clothing</li>
            <li>Modest Wear</li>
            <li>Hoodies & Pullovers</li>
            <li>Shirts & Tops</li>
          </ul>
        </div>

        {/* Kids */}
        <div>
          <h4 className="text-white font-semibold mb-3">Kids'</h4>
          <ul className="space-y-2">
            <li>Infant & Toddler Shoes</li>
            <li>Kids' Shoes</li>
            <li>Kids' Jordan Shoes</li>
            <li>Kids' Basketball Shoes</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 items-start sm:justify-end">
          <Twitter className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
          <Facebook className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
          <Instagram className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between text-sm text-gray-500">
          <p>🌍 Croatia © 2025 Nike, Inc. All Rights Reserved</p>
          <div className="flex space-x-6 mt-2 sm:mt-0">
            <a href="#">Guides</a>
            <a href="#">Terms of Sale</a>
            <a href="#">Terms of Use</a>
            <a href="#">Nike Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
