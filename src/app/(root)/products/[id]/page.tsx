
import ProductDetail from 'components/ProductDetail'
import ProductCard from 'components/Card'
import { fetchSuggestedProducts, getProductById } from 'lib/actions/products-actions'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    )
  }

  const suggestions = await fetchSuggestedProducts(product.id)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <ProductDetail {...product}/>

    {/* You Might Also Like */}
      
      <h2 className="text-heading-3 text-dark-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {suggestions.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
    </section>
  )
}
