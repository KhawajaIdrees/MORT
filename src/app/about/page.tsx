import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
      {/* Editorial Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-display text-[#B8A47E] tracking-[0.3em] uppercase block">
          THE MORT MANIFESTO
        </span>
        <h1 className="font-display text-4xl sm:text-7xl font-bold text-[#F5F5F0] tracking-tight uppercase leading-none">
          ENGINEERED FOR THE UNTIMELY
        </h1>
        <p className="text-sm sm:text-base font-sans text-[#8A8A8A] max-w-2xl mx-auto leading-relaxed">
          MORT IS AN INDEPENDENT LUXURY FASHION ARCHIVE CRAFTING HEAVYWEIGHT APPAREL AND TECHNICAL SILHOUETTES IN LIMITED EDITIONS.
        </p>
      </div>

      {/* Cover Photography */}
      <div className="relative h-[480px] w-full border border-[#262626] bg-[#151515] overflow-hidden">
        <Image
          src="/images/about/about-hoodie.jpg"
          alt="MORT Archive"
          fill
          priority
          unoptimized
          className="object-cover object-center filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
          <div>
            <span className="text-xs font-display text-[#8A8A8A] tracking-widest uppercase block">ESTABLISHED 2024</span>
            <h2 className="font-display text-3xl font-bold text-[#F5F5F0] uppercase">TOKYO // LONDON // NEW YORK</h2>
          </div>
          <p className="text-xs font-sans text-[#8A8A8A] max-w-md">
            UNCOMPROMISING TEXTILE WEIGHTS. ARCHITECTURAL SILHOUETTE CUTS. STRICTLY LIMITED EDITIONS.
          </p>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-[#151515] border border-[#262626] space-y-4">
          <h3 className="font-display text-xl font-bold text-[#F5F5F0] uppercase tracking-wider">
            500GSM FRENCH TERRY
          </h3>
          <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed">
            We exclusively engineer custom 500GSM French Terry cottons and 280GSM heavy jersey knits to maintain structural silhouettes that endure over time.
          </p>
        </div>

        <div className="p-10 bg-[#151515] border border-[#262626] space-y-4">
          <h3 className="font-display text-xl font-bold text-[#F5F5F0] uppercase tracking-wider">
            TECHNICAL HARDWARE
          </h3>
          <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed">
            Every zip, magnetic release buckle, and cinch cord is sourced from industry leaders such as Fidlock and YKK AquaGuard.
          </p>
        </div>

        <div className="p-10 bg-[#151515] border border-[#262626] space-y-4">
          <h3 className="font-display text-xl font-bold text-[#F5F5F0] uppercase tracking-wider">
            LIMITED EDITIONS
          </h3>
          <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed">
            Each capsule drop is strictly limited to 500 hand-numbered pieces worldwide to preserve exclusivity and prevent textile waste.
          </p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="bg-[#151515] border border-[#262626] p-12 text-center space-y-6">
        <h2 className="font-display text-3xl font-bold text-[#F5F5F0] uppercase tracking-tight">
          EXPLORE THE CURRENT ARCHIVE
        </h2>
        <div className="flex justify-center">
          <Link href="/shop">
            <Button variant="primary" size="lg" className="gap-3">
              <span>VIEW CATALOGUE</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
