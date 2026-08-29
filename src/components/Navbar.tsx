"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "./ui/Button";

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { items, isOpen, toggleCart, closeCart, removeItem, updateQuantity, getCartTotal, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050505]/95 border-b border-[#1A1A1A]"
            : "bg-gradient-to-b from-black/95 via-black/70 to-transparent"
        }`}
      >
        {/* Top Free Shipping Banner matching Image 2 */}
        <div className="bg-[#050505] border-b border-[#1A1A1A]/60 py-1.5 px-4 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-xs font-sans font-medium tracking-[0.15em] text-[#CCCCCC] hover:text-white uppercase transition-colors"
          >
            <span>FREE SHIPPING ON ORDERS OVER $100</span>
            <ArrowRight className="w-3 h-3 text-[#CCCCCC]" />
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white/90 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* MORT Logo - Prominent & exact size matching screenshot */}
          <Link href="/" className="flex items-center">
            <div className="relative w-44 sm:w-52 md:w-56 h-9 sm:h-10 md:h-11">
              <Image
                src="/logo/mort-logo.png"
                alt="MORT"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Nav Links Center */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-xs font-semibold tracking-[0.25em] transition-colors py-1 ${
                    isActive ? "text-white" : "text-[#D0D0D0] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Icons: Search, User/Account, Shopping Bag with badge */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#E0E0E0] hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 stroke-[1.75]" />
            </button>

            <Link
              href="/contact"
              className="text-[#E0E0E0] hover:text-white transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <button
              onClick={toggleCart}
              className="relative text-[#E0E0E0] hover:text-white transition-colors flex items-center p-0.5"
              aria-label="Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              <span className="absolute -top-1.5 -right-2 w-[18px] h-[18px] rounded-full bg-white text-black font-sans font-bold text-[10px] leading-none flex items-center justify-center border border-black z-10 shadow-sm">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="w-full bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#1A1A1A] py-4 px-6 mt-3">
            <div className="max-w-3xl mx-auto relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="SEARCH MORT CATALOGUE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#050505] border border-[#222222] pl-12 pr-12 py-3 text-xs text-white font-sans tracking-widest focus:outline-none focus:border-white/50 placeholder:text-[#666666]"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 text-[#A0A0A0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-[#050505] border-r border-[#1A1A1A] h-full p-8 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1A1A1A]">
                <div className="relative w-36 h-9">
                  <Image src="/logo/mort-logo.png" alt="MORT" fill unoptimized className="object-contain" />
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#A0A0A0] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-base font-medium tracking-widest text-white hover:text-[#C2B092] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#A0A0A0]" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#1A1A1A] space-y-4 text-xs font-sans text-[#A0A0A0]">
              <p>MORT © 2026</p>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Cart */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/75 transition-opacity" onClick={closeCart} />
          <div className="relative w-full max-w-md bg-[#050505] border-l border-[#1A1A1A] h-full flex flex-col z-10">
            <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0F0F0F]">
              <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-white uppercase">
                SHOPPING BAG ({itemCount})
              </h2>
              <button onClick={closeCart} className="text-[#A0A0A0] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-sans text-xs tracking-widest text-[#A0A0A0]">
                    YOUR BAG IS EMPTY
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <Button variant="primary" size="sm">
                      EXPLORE CATALOGUE
                    </Button>
                  </Link>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex gap-4 p-4 bg-[#0F0F0F] border border-[#1A1A1A]">
                    <div className="relative w-16 h-20 bg-[#050505] flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill unoptimized className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-sans text-xs font-semibold text-white">
                            {item.product.name}
                          </h4>
                          <button onClick={() => removeItem(item.product.id, item.selectedSize)} className="text-[#A0A0A0] hover:text-white">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-sans text-[#A0A0A0] mt-1">
                          SIZE: {item.selectedSize}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1A1A]">
                        <div className="flex items-center border border-[#1A1A1A] bg-[#050505]">
                          <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)} className="px-2 text-xs text-[#A0A0A0] hover:text-white">-</button>
                          <span className="px-2 text-xs text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)} className="px-2 text-xs text-[#A0A0A0] hover:text-white">+</button>
                        </div>
                        <span className="font-sans text-xs font-semibold text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#1A1A1A] bg-[#0F0F0F] space-y-4">
                <div className="flex justify-between font-sans text-xs font-bold text-white tracking-wider">
                  <span>TOTAL</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <Link href="/cart" onClick={closeCart} className="block">
                  <Button variant="primary" fullWidth size="lg">
                    CHECKOUT
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
