'use client'
import { useState, useTransition, useEffect } from 'react'
import ProductFilter from './ProductFilter'
import SortBy from './SortBy'

import Card from './Card'
import { filterProducts } from 'lib/actions/filter-products-actions'

type Product = {
  id: string
  image: string
  title: string
  category: string
  colors: number
  price: string
  badge?: string
}

export default function ProductControls({ initialProducts }: { initialProducts: Product[] }) {
  const [gender, setGender] = useState('')
  const [size, setSize] = useState('')
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | ''>('')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const filteredProducts = await filterProducts({ gender, size, sortBy })
      setProducts(filteredProducts)
    })
  }, [gender, size, sortBy])

  const handleClear = () => {
    setGender('')
    setSize('')
    setSortBy('')
    setProducts(initialProducts)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Best of Air Max</h1>
          <SortBy sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <ProductFilter
          gender={gender}
          size={size}
          onGenderChange={setGender}
          onSizeChange={setSize}
          onClear={handleClear}
        />

        {/* You can render your product grid here using `products` */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center flex-1">
            {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
                ) : (
                products.map((product) => (
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
    </div>
  )
}


        