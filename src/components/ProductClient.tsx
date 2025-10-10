'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import ProductFilter from './ProductFilter'

type Product = {
  id: string
  image: string
  title: string
  category: string
  colors: number
  price: string
  badge?: string
}

export default function ProductClient({ initialProducts }: { initialProducts: Product[] }) {
  const [filteredProducts] = useState<Product[]>(initialProducts)

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* <ProductFilter onResults={setFilteredProducts} /> */}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center flex-1">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              colors={product.colors}
              price={product.price}
              width={500}
              height={500}
            />
          ))
        )}
      </div>
    </div>
  )
}
