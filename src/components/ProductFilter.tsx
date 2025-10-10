'use client'

import { useState, useTransition } from 'react'
import { ChevronDown } from 'lucide-react'
import { filterProducts } from '@/lib/actions/filterProducts'

interface ProductCard {
  id: string
  image: string
  title: string
  category: string
  colors: number
  price: string
}

export default function ProductFilter({ onResults }: { onResults: (products: ProductCard[]) => void }) {
  const [gender, setGender] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const priceOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $150', value: '100-150' },
    { label: 'Over $150', value: '150+' },
  ]

  const genders = ['Men', 'Women', 'Unisex']
  const sizes = ['6', '7', '8', '9', '10', '11', '12']
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Gray']

  async function applyFilters() {
    startTransition(async () => {
      const products = await filterProducts({ gender, size, color, priceRange })
      onResults(products)
    })
  }

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Filter Products</h2>

      {/* Gender Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 font-medium">Gender</h3>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={() => setGender(g)}
                className="accent-black"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 font-medium">Size</h3>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        {/* Fixed: use grid for even layout */}
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`py-1.5 px-1.5 rounded-md border text-sm text-center ${
                size === s ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 font-medium">Color</h3>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        {/* Fixed: use grid for consistent vertical + horizontal alignment */}
        <div className="grid grid-cols-2 gap-2">
          {colors.map((c) => (
            <label key={c} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={() => setColor(c)}
                className="accent-black"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 font-medium">Price</h3>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        <div className="space-y-2">
          {priceOptions.map((range) => (
            <label key={range.value} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="price"
                value={range.value}
                checked={priceRange === range.value}
                onChange={() => setPriceRange(range.value)}
                className="accent-black"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters */}
      <button
        onClick={applyFilters}
        disabled={isPending}
        className="w-full bg-black text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition"
      >
        {isPending ? 'Filtering...' : 'Apply Filters'}
      </button>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setGender('')
          setSize('')
          setColor('')
          setPriceRange('')
        }}
        className="w-full bg-gray-200 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Clear Filters
      </button>
    </aside>
  )
}
