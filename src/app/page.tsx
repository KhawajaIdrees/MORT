import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import GuaranteesBar from "@/components/GuaranteesBar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import ManifestoNewsletter from "@/components/ManifestoNewsletter";
import { fetchProducts, fetchCategories } from "@/lib/sanity";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default async function HomePage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Guarantees Bar */}
      <GuaranteesBar />

      {/* 3. Category Section matching Image 2 */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 border-b border-[#1A1A1A]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#A0A0A0] font-sans text-xs font-medium tracking-[0.25em] uppercase block mb-1">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Find What Defines You.
            </h2>
          </div>
          <Link href="/shop">
            <button className="px-5 py-2 border border-white/20 hover:border-white text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* 4 Category Cards in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. New Arrivals Section matching Image 2 */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#A0A0A0] font-sans text-xs font-medium tracking-[0.25em] uppercase block mb-1">
              NEW ARRIVALS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Fresh In.
            </h2>
          </div>
          <Link href="/shop">
            <button className="px-5 py-2 border border-white/20 hover:border-white text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Product Carousel Grid with Left/Right controls matching Image 2 */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0F0F0F] border border-white/20 items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0F0F0F] border border-white/20 items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl"
            aria-label="Next product"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 5. Manifesto & Newsletter split bottom section matching Image 2 */}
      <ManifestoNewsletter />
    </div>
  );
}
