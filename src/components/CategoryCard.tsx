import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative h-96 w-full overflow-hidden bg-[#0F0F0F] border border-[#1A1A1A] flex flex-col justify-end p-6 transition-all hover:border-white/30"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        unoptimized
        className="object-cover object-center filter brightness-85 contrast-110 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

      {/* Content matching Image */}
      <div className="relative z-10 flex items-end justify-between w-full">
        <div>
          <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">
            {category.name}
          </h3>
          <p className="text-xs font-sans text-[#A0A0A0] mt-0.5">
            {category.count}
          </p>
        </div>

        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
