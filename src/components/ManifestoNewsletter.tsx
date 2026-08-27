"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Twitter, Youtube } from "lucide-react";

export const ManifestoNewsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="bg-[#050505] border-t border-[#1A1A1A] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

        {/* Left Column: ABOUT MORT */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[#A0A0A0] text-xs font-sans font-medium tracking-[0.25em] uppercase block mb-2">
              ABOUT MORT
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              We don’t follow.<br />
              We define.
            </h2>
            <p className="mt-4 text-xs sm:text-sm font-sans text-[#A0A0A0] leading-relaxed max-w-md">
              MORT is built for the ones who move different. Every piece is designed with purpose, crafted with precision, and released in limited numbers.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/about">
              <button className="text-xs font-sans font-bold text-white tracking-[0.15em] uppercase flex items-center gap-2 hover:text-[#C2B092] transition-colors group">
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Middle Photography - High Resolution Brutalist Architecture with MORT flag */}
        <div className="lg:col-span-3 relative h-72 lg:h-auto min-h-[260px] bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1600"
            alt="MORT Architecture Banner"
            fill
            quality={95}
            className="object-cover object-center filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="relative w-36 h-16 rotate-90">
              <Image
                src="/logo/mort-logo.png"
                alt="MORT"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Column: JOIN THE MOVEMENT */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[#A0A0A0] text-xs font-sans font-medium tracking-[0.25em] uppercase block mb-2">
              JOIN THE MOVEMENT
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Be first. Always.
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-sans text-[#A0A0A0] leading-relaxed">
              Get early access to new drops and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans placeholder:text-[#666666] focus:outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C2B092] text-[#050505] font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#B5A384] transition-colors whitespace-nowrap"
                >
                  JOIN NOW
                </button>
              </div>
              {submitted && (
                <p className="text-xs font-sans text-[#C2B092]">
                  ✓ You are on the early access list.
                </p>
              )}
            </form>
          </div>

          <div className="flex items-center gap-5 pt-4 text-white/70">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.15z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ManifestoNewsletter;
