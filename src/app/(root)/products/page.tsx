import ProductControls from '@/components/ProductControls'
import { fetchAllProducts } from '@/lib/actions/products-actions'

export default async function ProductsPage() {
  const products = await fetchAllProducts()

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <ProductControls initialProducts={products} />
    </section>
  )
}
