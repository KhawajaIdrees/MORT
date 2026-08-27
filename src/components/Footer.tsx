"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const Footer = () => {
  const [currency, setCurrency] = useState("PAKISTAN (PKR)");
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const currencies = ["PAKISTAN (PKR)", "UNITED STATES (USD)", "UNITED KINGDOM (GBP)", "EUROPE (EUR)"];

  return (
    <footer className="bg-[#050505] border-t border-[#1A1A1A] py-3.5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A0A0A0]">

        {/* Left Copyright - Exact match to screenshot */}
        <p className="tracking-widest uppercase font-medium">
          © MORT 2026
        </p>

        {/* Center Legal Links - Exact spacing matching screenshot */}
        <div className="flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase">
          <Link href="/contact" className="hover:text-white transition-colors">TERMS</Link>
          <Link href="/contact" className="hover:text-white transition-colors">PRIVACY</Link>
          <Link href="/contact" className="hover:text-white transition-colors">SHIPPING</Link>
          <Link href="/contact" className="hover:text-white transition-colors">RETURNS</Link>
        </div>

        {/* Right Currency Selector - Exact match to screenshot */}
        <div className="relative">
          <button
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="flex items-center gap-1.5 text-xs font-medium tracking-widest text-[#A0A0A0] hover:text-white transition-colors uppercase"
          >
            <span>{currency}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {currencyOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[#0F0F0F] border border-[#1A1A1A] py-1 shadow-2xl z-50">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    setCurrencyOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-sans tracking-widest transition-colors ${currency === curr ? "bg-[#1A1A1A] text-white" : "text-[#A0A0A0] hover:text-white"
                    }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
