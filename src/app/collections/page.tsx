import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCollections, fetchProducts } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import type { Collection, Product } from "@/types";

export default async function CollectionsPage() {
  let collections: Collection[] = [];
  let products: Product[] = [];
  let errorMessage = "";

  try {
    [collections, products] = await Promise.all([fetchCollections(), fetchProducts()]);
  } catch {
    errorMessage = "UNABLE TO LOAD COLLECTIONS.";
  }

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-display text-[#8A8A8A] tracking-[0.3em] uppercase block">
          EDITORIAL LOOKBOOKS & CAPSULES
        </span>
        <h1 className="font-display text-4xl sm:text-7xl font-bold text-[#F5F5F0] tracking-tight uppercase leading-none">
          MORT ARCHIVE
        </h1>
        <p className="text-sm font-sans text-[#8A8A8A] leading-relaxed">
          EACH CAPSULE DROP EXPLORES DISTINCT ARCHITECTURAL SILHOUETTES AND HEAVYWEIGHT TEXTILES.
        </p>
      </div>

      {errorMessage ? (
        <div className="text-center py-20 bg-[#151515] border border-[#262626]">
          <h3 className="font-display text-base font-bold text-[#F5F5F0] uppercase tracking-widest">
            {errorMessage}
          </h3>
        </div>
      ) : (
        <div className="space-y-24">
          {collections.map((col, index) => {
            const colProducts = products.filter((p) => p.collection === col.slug);

            return (
              <div key={col.id} className="space-y-10 border-b border-[#262626] pb-20">
                <div className="relative h-[440px] sm:h-[520px] w-full border border-[#262626] bg-[#151515] overflow-hidden group flex flex-col justify-end p-8 sm:p-14">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover object-center filter brightness-45 contrast-110 editorial-img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#0A0A0A] border border-[#262626] text-[#F5F5F0] text-[10px] font-display tracking-[0.2em] uppercase">
                        CAPSULE {col.number || `0${index + 1}`}
                      </span>
                      <span className="text-xs font-sans text-[#8A8A8A]">
                        {col.itemCount} PIECES AVAILABLE
                      </span>
                    </div>

                    <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F0] tracking-tight uppercase">
                      {col.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-display text-[#B8A47E] tracking-wider uppercase">
                      {col.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#8A8A8A] font-sans leading-relaxed max-w-xl">
                      {col.description}
                    </p>

                    <div className="pt-2">
                      <Link href={`/shop?collection=${col.slug}`}>
                        <Button variant="primary" size="md" className="gap-3">
                          <span>EXPLORE {col.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-display text-sm font-semibold text-[#F5F5F0] tracking-[0.2em] uppercase">
                    KEY SELECTIONS FROM {col.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {colProducts.slice(0, 3).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
