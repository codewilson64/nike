import { fetchAllProducts } from "@/lib/actions/products-actions";
import ProductCard from "./Card";

export default async function FrontProduct() {
  const allProducts = await fetchAllProducts();

  // Only take 3 products
  const products = allProducts.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-heading-3 text-dark-900 mb-6">Best of Air Max</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
