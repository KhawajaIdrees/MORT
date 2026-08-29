"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SlideData {
  id: string;
  image: string;
  mobileImage?: string;
  tagline: string;
  subtitle: string;
}

const slidesData: SlideData[] = [
  {
    id: "01",
    image: "/images/hero/hero-01.jpg",
    mobileImage: "/images/hero/hero-mobile-01.png",
    tagline: "NOT ORDINARY.",
    subtitle: "Timeless designs.\nPremium quality.\nBuilt for the ones\nwho move different.",
  },
  {
    id: "02",
    image: "/images/hero/hero-02.jpg",
    mobileImage: "/images/hero/hero-02.jpg",
    tagline: "ARCHITECTURAL STATEMENT.",
    subtitle: "Brutalist aesthetics. Heavyweight garments.\nEngineered with raw structural precision.",
  },
  {
    id: "03",
    image: "/images/hero/hero-03.jpg",
    mobileImage: "/images/hero/hero-03.jpg",
    tagline: "LIMITED DROPS.",
    subtitle: "Dark minimalist techwear.\nExclusive releases crafted for the bold.",
  },
];

export const Hero = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeSlide = slidesData[currentSlideIndex];

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen bg-[#050505] flex flex-col justify-between pt-28 sm:pt-24 pb-8 sm:pb-16 overflow-hidden border-b border-[#1A1A1A]">
      {/* Background Images with smooth opacity cross-fade */}
      <div className="absolute inset-0 z-0">
        {slidesData.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Mobile background image using Image 1 */}
              <div className="block sm:hidden absolute inset-0">
                <Image
                  src={slide.mobileImage || slide.image}
                  alt={`MORT Hero Banner Mobile ${slide.id}`}
                  fill
                  priority={index === 0}
                  unoptimized
                  className="object-cover object-right filter brightness-[0.90] contrast-105"
                />
              </div>

              {/* Desktop background image */}
              <div className="hidden sm:block absolute inset-0">
                <Image
                  src={slide.image}
                  alt={`MORT Hero Banner Desktop ${slide.id}`}
                  fill
                  priority={index === 0}
                  unoptimized
                  className="object-cover object-center filter brightness-[0.85] contrast-110"
                />
              </div>
            </div>
          );
        })}

        {/* Dark Vignette Overlay for Left Text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/75 to-transparent w-full md:w-3/4 lg:w-2/3 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 z-20 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30 my-auto">
        {/* Left Text Block */}
        <div className="lg:col-span-8 space-y-4 pt-4 sm:pt-10 lg:pt-0">
          <span className="text-[#A0A0A0] text-[11px] sm:text-xs font-sans font-medium tracking-[0.25em] uppercase block mb-1 transition-all duration-300">
            {activeSlide.tagline}
          </span>

          {/* EXACT MORT Wordmark Logo */}
          <div className="relative w-64 sm:w-[440px] md:w-[520px] h-20 sm:h-28 md:h-32 -ml-1">
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
          <p className="text-xs sm:text-base font-sans text-[#D0D0D0] leading-relaxed max-w-xs sm:max-w-md pt-1 sm:pt-2 whitespace-pre-line transition-all duration-300">
            {activeSlide.subtitle}
          </p>

          {/* White Rectangular Button */}
          <div className="pt-3 sm:pt-4">
            <Link href="/shop">
              <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#050505] hover:bg-[#E2E2E2] transition-colors font-sans text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-3 shadow-2xl">
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-[#050505]" />
              </button>
            </Link>
          </div>
        </div>

        {/* Far Right Vertical Slide Indicator (Desktop) */}
        <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center space-y-4 text-xs font-sans text-[#A0A0A0] z-30">
          {slidesData.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <React.Fragment key={slide.id}>
                <button
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`transition-all duration-300 tracking-widest font-sans ${
                    isActive ? "text-white font-bold text-sm scale-110" : "text-[#777777] hover:text-white"
                  }`}
                  aria-label={`Go to slide ${slide.id}`}
                >
                  {slide.id}
                </button>
                {isActive && (
                  <div className="flex flex-col items-center space-y-2.5 py-0.5 animate-fadeIn">
                    <div className="w-[1.5px] h-7 bg-white/70" />
                    <div className="w-4 h-[2px] bg-white" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Slide Indicator at Bottom of Hero matching Image 2 */}
      <div className="flex sm:hidden items-center justify-between w-full max-w-[280px] mx-auto z-30 pt-6 pb-2 px-2">
        <button
          onClick={() => setCurrentSlideIndex(0)}
          className={`font-sans tracking-widest text-xs transition-colors ${
            currentSlideIndex === 0 ? "text-white font-bold" : "text-[#777777]"
          }`}
        >
          01
        </button>
        <div className="flex-1 mx-4 h-[1px] bg-white/30 relative">
          <div
            className="absolute top-0 h-full bg-white transition-all duration-500"
            style={{
              left: `${(currentSlideIndex / (slidesData.length - 1)) * 66}%`,
              width: "33%",
            }}
          />
        </div>
        <button
          onClick={() => setCurrentSlideIndex(slidesData.length - 1)}
          className={`font-sans tracking-widest text-xs transition-colors ${
            currentSlideIndex === slidesData.length - 1 ? "text-white font-bold" : "text-[#777777]"
          }`}
        >
          03
        </button>
      </div>
    </section>
  );
};

export default Hero;
