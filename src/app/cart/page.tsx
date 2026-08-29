"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ChevronRight,
  Tag,
  Lock,
  Check,
} from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal, getItemCount } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const discountAmount = (subtotal * discount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "OBLIVION10") {
      setDiscount(10);
      setPromoApplied(true);
      setPromoError("");
    } else if (promoCode.trim().toUpperCase() === "MORT20") {
      setDiscount(20);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("INVALID PROMO CODE. TRY 'OBLIVION10'");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="pt-36 pb-28 max-w-3xl mx-auto px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-[#151515] border border-[#262626] text-[#F5F5F0] rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#B8A47E]" />
        </div>
        <span className="text-xs font-display text-[#8A8A8A] tracking-[0.25em] uppercase block">
          TRANSMISSION CONFIRMED
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F5F0] uppercase tracking-tight">
          THANK YOU FOR YOUR ORDER
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#8A8A8A] max-w-md mx-auto leading-relaxed">
          YOUR ORDER HAS BEEN RECORDED AND IS BEING PREPARED FOR DISPATCH FROM OUR TOKYO DISTRIBUTION CENTER.
        </p>

        <div className="p-6 bg-[#151515] border border-[#262626] text-left font-sans text-xs space-y-3 max-w-md mx-auto text-[#8A8A8A]">
          <div className="flex justify-between">
            <span>CARRIER:</span>
            <span className="text-[#F5F5F0]">DHL EXPRESS WORLDWIDE</span>
          </div>
          <div className="flex justify-between">
            <span>DELIVERY:</span>
            <span className="text-[#F5F5F0]">3-5 BUSINESS DAYS</span>
          </div>
        </div>

        <div className="pt-4">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              RETURN TO CATALOGUE
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-[#8A8A8A] uppercase tracking-widest">
        <Link href="/" className="hover:text-[#F5F5F0] transition-colors">HOME</Link>
        <ChevronRight className="w-3 h-3 text-[#8A8A8A]" />
        <span className="text-[#F5F5F0] font-medium">SHOPPING BAG ({getItemCount()})</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#262626] pb-6">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F5F0] uppercase tracking-tight">
          YOUR SHOPPING BAG
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center bg-[#151515] border border-[#262626] space-y-6">
          <ShoppingBag className="w-10 h-10 text-[#8A8A8A] mx-auto" />
          <h2 className="font-display text-lg font-bold text-[#F5F5F0] uppercase tracking-widest">
            YOUR BAG IS CURRENTLY EMPTY
          </h2>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="gap-3">
              <span>EXPLORE CATALOGUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items: 7 Cols */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="p-6 bg-[#151515] border border-[#262626] flex flex-col sm:flex-row gap-6"
              >
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative w-24 h-32 bg-[#0A0A0A] border border-[#262626] flex-shrink-0 overflow-hidden"
                >
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-display text-sm font-semibold text-[#F5F5F0] uppercase hover:text-white transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize)}
                        className="text-[#8A8A8A] hover:text-[#F5F5F0] p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-4 text-xs font-sans text-[#8A8A8A] mt-2">
                      <span>SIZE: <strong className="text-[#F5F5F0]">{item.selectedSize}</strong></span>
                      <span>PRICE: <strong className="text-[#F5F5F0]">{formatPrice(item.product.price)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#262626]">
                    <div className="flex items-center border border-[#262626] bg-[#0A0A0A]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="px-3 py-1 text-xs text-[#8A8A8A] hover:text-[#F5F5F0]"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-sans text-xs text-[#F5F5F0]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="px-3 py-1 text-xs text-[#8A8A8A] hover:text-[#F5F5F0]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display text-base font-semibold text-[#F5F5F0]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2 text-xs font-sans text-[#8A8A8A]">
              <button onClick={clearCart} className="hover:text-[#F5F5F0]">
                CLEAR ENTIRE BAG
              </button>
              <Link href="/shop" className="hover:text-[#F5F5F0]">
                ← CONTINUE SHOPPING
              </Link>
            </div>
          </div>

          {/* Order Summary: 5 Cols */}
          <div className="lg:col-span-5 bg-[#151515] border border-[#262626] p-8 space-y-6 sticky top-28">
            <h2 className="font-display text-lg font-bold text-[#F5F5F0] uppercase tracking-wider">
              ORDER SUMMARY
            </h2>

            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-[11px] font-display text-[#8A8A8A] uppercase">
                PROMO CODE
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 w-3.5 h-3.5 text-[#8A8A8A]" />
                  <input
                    type="text"
                    placeholder="OBLIVION10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#262626] pl-9 pr-3 py-2.5 text-xs text-[#F5F5F0] font-sans uppercase focus:outline-none focus:border-[#F5F5F0]/40"
                  />
                </div>
                <Button variant="secondary" size="sm" type="submit">
                  APPLY
                </Button>
              </div>
              {promoApplied && <p className="text-xs font-sans text-[#B8A47E]">✓ DISCOUNT APPLIED</p>}
              {promoError && <p className="text-xs font-sans text-red-400">{promoError}</p>}
            </form>

            <div className="space-y-3 font-sans text-xs border-t border-b border-[#262626] py-4 text-[#8A8A8A]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#F5F5F0] font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#B8A47E]">
                  <span>DISCOUNT ({discount}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>EXPRESS SHIPPING</span>
                <span className="text-[#F5F5F0] font-semibold">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between font-display text-sm font-bold text-[#F5F5F0] pt-2 border-t border-[#262626]">
                <span>TOTAL</span>
                <span className="text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="gap-2 py-4"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>PROCEED TO CHECKOUT ({formatPrice(grandTotal)})</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
