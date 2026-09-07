"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage = product.images[0] ?? "/images/layout/prod-hoodie.png";
  const secondaryImage = product.slug === "minimal-t-shirt"
    ? primaryImage
    : product.images[1] ?? primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || "M", product.colors[0], 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group relative bg-[#0F0F0F] border border-[#1A1A1A] flex flex-col transition-colors hover:border-white/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full bg-[#050505] overflow-hidden block">
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          fill
          unoptimized
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#050505]/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-red-500 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <button
          onClick={handleQuickAdd}
          className="absolute inset-x-3 bottom-3 py-2 bg-white text-black text-xs font-sans font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{added ? "ADDED" : "QUICK ADD"}</span>
        </button>
      </Link>

      {/* Info Block */}
      <div className="p-4 space-y-1 bg-[#0F0F0F]">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-sans text-sm font-semibold text-white group-hover:text-white/80 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-xs font-medium text-[#A0A0A0]">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
