'use client'

import { ChevronDown } from 'lucide-react'

interface ProductFilterProps {
  gender: string
  size: string
  onGenderChange: (value: string) => void
  onSizeChange: (value: string) => void
  onClear: () => void
}

export default function ProductFilter({
  gender,
  size,
  onGenderChange,
  onSizeChange,
  onClear,
}: ProductFilterProps) {
  const genders = ['Men', 'Women', 'Kids']
  const sizes = ['7', '8', '9', '10', '11', '12']

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Filter Products</h2>

      {/* Gender Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 font-medium">Category</h3>
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
                onChange={() => onGenderChange(g)}
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
              onClick={() => onSizeChange(s)}
              className={`py-1.5 px-1.5 rounded-md border text-sm text-center ${
                size === s ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onClear}
        className="w-full bg-gray-200/50 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Clear Filters
      </button>
    </aside>
  )
}
