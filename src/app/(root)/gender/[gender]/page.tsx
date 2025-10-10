import ProductCard from '@/components/Card'
import { fetchProductsByGender } from '@/lib/actions/products-actions'

export default async function ProductPage({ params }: { params: Promise<{ gender: string }> }) {
  const { gender } = await params
  const products = await fetchProductsByGender(gender)

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No products found for this category.
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-heading-3 text-dark-900 mb-6 capitalize">
        {gender} Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            colors={product.colors}
          />
        ))}
      </div>
    </section>
  )
}
