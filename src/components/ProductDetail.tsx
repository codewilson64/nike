'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/app/zustand/useCartStore'

type ProductDetailProps = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  gender: string
  images: string[] // general images (optional)
  variants: {
    id: string
    color: string
    colorHex: string
    size: string
    price: number
    salePrice?: number
    inStock: boolean
    imageUrl: string // ✅ make sure this is included in your query
  }[]
}

export default function ProductDetail({
  id,
  name,
  description,
  category,
  brand,
  gender,
  images,
  variants,
}: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState(selectedVariant.imageUrl)

  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart({
      id: selectedVariant.id,
      name,
      category,
      size: selectedSize,
      quantity: 1,
      price: selectedVariant.salePrice ?? selectedVariant.price,
      image: selectedVariant.imageUrl,
    })
  }

  const handleColorSelect = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId)
    if (variant) {
      setSelectedVariant(variant)
      setMainImage(variant.imageUrl) // ✅ update to color image
    }
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12">
      {/* Left Side - Main Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Right Side - Product Info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-gray-500 mt-1 capitalize">
          {brand} • {category} • {gender}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-semibold">
            {selectedVariant.salePrice
              ? `$${selectedVariant.salePrice.toFixed(2)}`
              : `$${selectedVariant.price.toFixed(2)}`}
          </span>
          {selectedVariant.salePrice && (
            <span className="ml-2 text-gray-400 line-through">
              ${selectedVariant.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>

        {/* Colors (Image Variants) */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Map(variants.map(v => [v.color, v])).values()).map(v => (
              <button
                key={v.color}
                onClick={() => handleColorSelect(v.id)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 ${
                  selectedVariant.color === v.color
                    ? 'border-black scale-105'
                    : 'border-gray-300'
                } transition-transform`}
              >
                <Image
                  src={v.imageUrl}
                  alt={v.color}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {[...new Set(variants.map(v => v.size))].map(size => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedVariant.inStock}
          className="mt-8 w-full md:w-auto bg-black text-white rounded-xl px-8 py-3 text-base font-medium hover:bg-gray-900 transition-colors cursor-pointer"
        >
          {selectedVariant.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}
