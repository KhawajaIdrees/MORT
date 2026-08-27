"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState("01");
  const slides = ["01", "02", "03"];

  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center pt-24 pb-16 overflow-hidden border-b border-[#1A1A1A]">
      {/* FULL BACKGROUND hero-01.jpg (100% Uncompressed High Resolution) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-01.jpg"
          alt="MORT Editorial Hero"
          fill
          priority
          unoptimized
          className="object-cover object-center filter brightness-[0.85] contrast-110"
        />
        {/* Dark Vignette Overlay for Left Text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent w-full md:w-3/4 lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

        {/* Left Text Block - Exact alignment matching screenshot */}
        <div className="lg:col-span-8 space-y-4 pt-10 lg:pt-0">
          <span className="text-[#A0A0A0] text-xs font-sans font-medium tracking-[0.25em] uppercase block mb-1">
            NOT ORDINARY.
          </span>

          {/* EXACT MORT Wordmark Logo (Aligned directly below NOT ORDINARY.) */}
          <div className="relative w-80 sm:w-[440px] md:w-[520px] h-24 sm:h-28 md:h-32 -ml-1">
            <Image
              src="/logo/mort-logo.png"
              alt="MORT"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base font-sans text-[#D0D0D0] leading-relaxed max-w-md pt-2">
            Timeless designs. Premium quality.<br />
            Built for the ones who move different.
          </p>

          {/* White Rectangular Button */}
          <div className="pt-4">
            <Link href="/shop">
              <button className="px-8 py-3.5 bg-white text-[#050505] hover:bg-[#E2E2E2] transition-colors font-sans text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-3 shadow-2xl">
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-[#050505]" />
              </button>
            </Link>
          </div>
        </div>

      {/* Far Right Vertical Slide Indicator - Positioned flush right on viewport boundary */}
      <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center space-y-4 text-xs font-sans text-[#A0A0A0] z-20">
        {slides.map((slide) => {
          const isActive = currentSlide === slide;
          return (
            <React.Fragment key={slide}>
              <button
                onClick={() => setCurrentSlide(slide)}
                className={`transition-colors tracking-widest font-sans ${
                  isActive ? "text-white font-bold text-sm" : "text-[#777777] hover:text-white"
                }`}
              >
                {slide}
              </button>
              {isActive && (
                <div className="flex flex-col items-center space-y-2.5 py-0.5">
                  <div className="w-[1.5px] h-7 bg-white/70" />
                  <div className="w-4 h-[2px] bg-white" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      </div>
    </section>
  );
};

export default Hero;
