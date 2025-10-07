import ProductCard from "./Card";

export default function ProductGrid() {
  const products = [
    {
      badge: "Best Seller",
      image: "/shoes/shoe-5.avif",
      title: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      colors: 6,
      price: "$98.30",
    },
    {
      badge: "New Arrival",
      image: "/shoes/shoe-6.avif",
      title: "Nike Dunk Low Retro",
      category: "Men's Shoes",
      colors: 4,
      price: "$120.00",
    },
    {
      badge: "Limited",
      image: "/shoes/shoe-7.avif",
      title: "Nike Air Max Pulse",
      category: "Women's Shoes",
      colors: 5,
      price: "$150.00",
    },
  ];

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
