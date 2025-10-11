'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SortByProps {
  sortBy: 'highest' | 'lowest' | ''
  onSortChange: (value: 'highest' | 'lowest' | '') => void
}

export default function SortBy({ sortBy, onSortChange }: SortByProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-light-300 text-gray-900 px-4 py-2 rounded-xl hover:bg-dark-800 transition"
      >
        {sortBy === 'highest'
          ? 'Highest Price'
          : sortBy === 'lowest'
          ? 'Lowest Price'
          : 'Sort By'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-light-100 border border-light-300 rounded-xl shadow-lg z-10">
          <button
            type="button"
            onClick={() => {
              onSortChange('highest')
              setOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-200/50 rounded-t-xl"
          >
            Highest Price
          </button>
          <button
            type="button"
            onClick={() => {
              onSortChange('lowest')
              setOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-200/50 rounded-b-xl"
          >
            Lowest Price
          </button>
        </div>
      )}
    </div>
  )
}
