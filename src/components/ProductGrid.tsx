"use client";

import React, { useState } from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "EDITORIAL SELECTIONS",
  subtitle = "EXPLORE THE MORT ARCHIVE CATALOGUE",
  showFilters = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [
    { id: "all", label: "ALL PIECES" },
    { id: "hoodies", label: "HOODIES" },
    { id: "tshirts", label: "TEES" },
    { id: "pants", label: "BOTTOMS" },
    { id: "accessories", label: "ACCESSORIES" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <section className="py-16">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#262626] pb-8">
        <div>
          <span className="text-[#8A8A8A] font-display text-xs tracking-[0.25em] uppercase mb-1 block">
            MORT CATALOGUE // DROP 04
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F0] tracking-tight uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-sans text-[#8A8A8A] mt-1 tracking-wider uppercase">
              {subtitle}
            </p>
          )}
        </div>

        {/* Filters & Sorting */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-4 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-display text-xs tracking-[0.2em] uppercase transition-colors py-1 ${
                    activeCategory === cat.id
                      ? "text-[#F5F5F0] font-semibold border-b border-[#F5F5F0]"
                      : "text-[#8A8A8A] hover:text-[#F5F5F0]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 border-l border-[#262626] pl-6 text-xs font-sans text-[#8A8A8A]">
              <span>SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#F5F5F0] focus:outline-none cursor-pointer uppercase font-display"
              >
                <option value="featured" className="bg-[#0A0A0A] text-[#F5F5F0]">FEATURED</option>
                <option value="price-low" className="bg-[#0A0A0A] text-[#F5F5F0]">PRICE: LOW TO HIGH</option>
                <option value="price-high" className="bg-[#0A0A0A] text-[#F5F5F0]">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#151515] border border-[#262626]">
          <h3 className="font-display text-base font-bold text-[#F5F5F0] uppercase tracking-widest">
            NO PIECES FOUND IN THIS CATEGORY
          </h3>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 px-6 py-2.5 bg-[#F5F5F0] text-[#0A0A0A] text-xs font-display font-semibold tracking-widest uppercase"
          >
            VIEW ALL PIECES
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
