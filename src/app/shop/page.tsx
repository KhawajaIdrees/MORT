import React from "react";
import { fetchProducts, fetchCategories } from "@/lib/sanity";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ShopPageProps {
  searchParams: {
    category?: string;
    collection?: string;
    sort?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await fetchProducts();
  const selectedCategory = searchParams.category;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="pt-36 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-sans text-[#8A8A8A] mb-8 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#F5F5F0] transition-colors">HOME</Link>
        <ChevronRight className="w-3 h-3 text-[#8A8A8A]" />
        <span className="text-[#F5F5F0] font-medium">CATALOGUE</span>
        {selectedCategory && (
          <>
            <ChevronRight className="w-3 h-3 text-[#8A8A8A]" />
            <span className="text-[#B8A47E] font-medium">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Header Title */}
      <div className="mb-12 border-b border-[#262626] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-display text-[#8A8A8A] tracking-[0.25em] uppercase">
            MORT ARCHIVE CATALOGUE
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F0] tracking-tight uppercase mt-2">
            ALL PIECES ({filteredProducts.length})
          </h1>
        </div>
        <p className="text-xs font-sans text-[#8A8A8A] max-w-md leading-relaxed">
          EXPLORE OUR COMPLETE ARCHIVE OF 500GSM HOODIES, HEAVYWEIGHT GRAPHIC TEES, CARGO PANTS, AND HARDWARE ACCESSORIES.
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        title={selectedCategory ? `${selectedCategory.toUpperCase()} COLLECTION` : "ARCHIVE CATALOGUE"}
        subtitle={`SHOWING ${filteredProducts.length} ARCHIVE ITEMS`}
        showFilters={true}
      />
    </div>
  );
}
