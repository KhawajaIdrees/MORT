"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { padStock } from "@/lib/mappers";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import {
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({
    name: "Black",
    hex: "#000000",
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const load = async () => {
      try {
        const [productRes, catalogRes] = await Promise.all([
          fetch(`/api/products/${slug}`),
          fetch("/api/products"),
        ]);

        if (!productRes.ok) {
          setError("PRODUCT NOT FOUND");
          return;
        }

        const productData = await productRes.json();
        const found = productData.product as Product;
        setProduct(found);
        setActiveImage(found.images[0]);
        setSelectedSize(found.sizes[0] || "M");
        if (found.colors && found.colors.length > 0) {
          setSelectedColor(found.colors[0]);
        }

        if (catalogRes.ok) {
          const catalogData = await catalogRes.json();
          const catalog = (catalogData.products as Product[]) ?? [];
          setRelatedProducts(
            catalog.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 3)
          );
        }
      } catch {
        setError("UNABLE TO LOAD PRODUCT");
      }
    };

    if (slug) load();
  }, [slug]);

  if (error) {
    return (
      <div className="pt-36 pb-20 text-center text-[#F5F5F0]">
        <p className="font-sans text-xs tracking-widest text-[#8A8A8A]">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 pb-20 text-center text-[#F5F5F0]">
        <p className="font-sans text-xs tracking-widest text-[#8A8A8A]">LOADING PRODUCT...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleColorSelect = (color: { name: string; hex: string }, colorIndex: number) => {
    setSelectedColor(color);
    const colorName = color.name.toLowerCase();
    const colorImage = product.images.find((image) => {
      const imageName = image.toLowerCase();
      if (colorName.includes("white") || colorName.includes("off-white")) {
        return imageName.includes("white") || imageName.includes("off-white");
      }
      if (colorName.includes("black")) return imageName.includes("black");
      return false;
    }) ?? product.images[colorIndex];
    if (colorImage) setActiveImage(colorImage);
  };

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-6 lg:px-12">
      <nav className="flex items-center gap-2 text-xs font-sans text-[#8A8A8A] uppercase tracking-widest mb-10">
        <Link href="/" className="hover:text-[#F5F5F0] transition-colors">HOME</Link>
        <ChevronRight className="w-3 h-3 text-[#8A8A8A]" />
        <Link href="/shop" className="hover:text-[#F5F5F0] transition-colors">CATALOGUE</Link>
        <ChevronRight className="w-3 h-3 text-[#8A8A8A]" />
        <span className="text-[#F5F5F0] font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full bg-[#151515] border border-[#262626] overflow-hidden">
            <Image
              src={activeImage || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-28 flex-shrink-0 border transition-colors ${
                    activeImage === img
                      ? "border-[#F5F5F0]"
                      : "border-[#262626] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8 sticky top-28">
          <div>
            <span className="text-[#8A8A8A] font-display text-xs tracking-[0.25em] uppercase block mb-1">
              COLLECTION: {product.collection.toUpperCase()}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F0] tracking-tight uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-display text-2xl font-bold text-[#F5F5F0]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-[#8A8A8A] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-3 text-xs font-display tracking-[0.2em] text-[#B8A47E] uppercase">
              STOCK {padStock(product.stock)} / {padStock(product.totalStock)}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-[#8A8A8A] font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-display tracking-widest text-[#8A8A8A]">
                <span>SELECT COLOR</span>
                <span className="text-[#F5F5F0]">{selectedColor.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, colorIndex) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color, colorIndex)}
                    className={`w-8 h-8 border ${
                      selectedColor.name === color.name
                        ? "border-[#F5F5F0]"
                        : "border-[#262626]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-display tracking-widest text-[#8A8A8A]">
              <span>SELECT SIZE</span>
              <button className="text-[#F5F5F0] hover:underline">SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-xs font-display font-semibold tracking-wider transition-colors ${
                    selectedSize === size
                      ? "bg-[#F5F5F0] border-[#F5F5F0] text-[#0A0A0A]"
                      : "bg-[#151515] border-[#262626] text-[#F5F5F0] hover:border-[#F5F5F0]/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <div className="flex items-center border border-[#262626] bg-[#151515] px-3 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-[#8A8A8A] hover:text-[#F5F5F0] text-sm"
                >
                  -
                </button>
                <span className="px-4 font-sans text-xs text-[#F5F5F0]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-[#8A8A8A] hover:text-[#F5F5F0] text-sm"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                className="gap-3"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? "ADDED TO BAG" : "ADD TO BAG"}</span>
              </Button>
            </div>
          </div>

          <div className="border-t border-[#262626] pt-4 space-y-4">
            <div className="border-b border-[#262626] pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === "details" ? null : "details")}
                className="w-full flex justify-between items-center text-xs font-display font-semibold text-[#F5F5F0] tracking-widest uppercase py-1"
              >
                <span>SPECIFICATIONS & MATERIALS</span>
                {openAccordion === "details" ? <ChevronUp className="w-4 h-4 text-[#8A8A8A]" /> : <ChevronDown className="w-4 h-4 text-[#8A8A8A]" />}
              </button>
              {openAccordion === "details" && (
                <ul className="mt-3 space-y-2 text-xs font-sans text-[#8A8A8A] pl-4 list-disc">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
                className="w-full flex justify-between items-center text-xs font-display font-semibold text-[#F5F5F0] tracking-widest uppercase py-1"
              >
                <span>GARMENT CARE</span>
                {openAccordion === "care" ? <ChevronUp className="w-4 h-4 text-[#8A8A8A]" /> : <ChevronDown className="w-4 h-4 text-[#8A8A8A]" />}
              </button>
              {openAccordion === "care" && (
                <ul className="mt-3 space-y-2 text-xs font-sans text-[#8A8A8A] pl-4 list-disc">
                  {product.care.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#262626] pt-16">
          <h2 className="font-display text-2xl font-bold text-[#F5F5F0] tracking-tight uppercase mb-8">
            RELATED ARCHIVE SELECTIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
