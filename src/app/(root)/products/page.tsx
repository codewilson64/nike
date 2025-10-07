import ProductClient from '@/components/ProductClient'
import { fetchAllProducts } from '@/lib/actions/products-actions'

export default async function ProductsPage() {
  const products = await fetchAllProducts()

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Best of Air Max</h1>
      <ProductClient initialProducts={products} />
    </section>
  )
}
