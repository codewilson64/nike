'use client'

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const route = useRouter()

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[600px] bg-white overflow-hidden">
      {/* Optional background image */}
      <div
        className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="max-w-lg">
          <p className="text-pink-500 font-semibold mb-2">Bold & Sporty</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Style That Moves <br /> With You.
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Not just style. Not just comfort. Footwear that effortlessly moves
            with your every step.
          </p>
          <button
            onClick={() => route.push('/products')}
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
            Find Your Shoe
          </button>
        </div>

        {/* Shoe Image (includes text already) */}
        <div className="relative">
          <img
            src="/hero-shoe.png"
            alt="Nike Air Jordan"
            className="w-[480px] sm:w-[560px] relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
