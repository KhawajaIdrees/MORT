"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  Check,
  ChevronRight,
  CreditCard,
  Truck,
  Building2,
  Smartphone,
  ShoppingBag,
  Copy,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Form State
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("express");
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "nayapay" | "easypaisa" | "jazzcash" | "bank"
  >("cod");

  const [transactionId, setTransactionId] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Pakistan",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const subtotal = getCartTotal();
  const shippingFee = shippingMethod === "express" ? (subtotal > 200 ? 0 : 25) : 15;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + shippingFee + tax;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `MORT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-4 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-[#0A0A0A] border border-[#1A1A1A] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-[#111111] border border-[#222222] text-white rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>

          <span className="text-[11px] font-sans text-[#888888] tracking-[0.25em] uppercase block">
            ORDER CONFIRMED // REF: {orderId}
          </span>

          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            THANK YOU FOR YOUR PURCHASE
          </h1>

          <p className="text-xs sm:text-sm font-sans text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
            A confirmation email has been dispatched to{" "}
            <strong className="text-white">{formData.email || "your email address"}</strong>. Your order is being prepared for dispatch.
          </p>

          {/* Customer Delivery & Payment Summary */}
          <div className="p-6 bg-[#050505] border border-[#1A1A1A] text-left font-sans text-xs space-y-3 text-[#A0A0A0] mt-6">
            <div className="flex justify-between pb-2 border-b border-[#1A1A1A]">
              <span>RECIPIENT:</span>
              <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#1A1A1A]">
              <span>COUNTRY / REGION:</span>
              <span className="text-white font-semibold">{formData.country}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#1A1A1A]">
              <span>DELIVERY ADDRESS:</span>
              <span className="text-white text-right font-medium">
                {formData.address}, {formData.city}, {formData.postalCode}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#1A1A1A]">
              <span>PAYMENT METHOD:</span>
              <span className="text-white font-semibold uppercase">{paymentMethod}</span>
            </div>
            {transactionId && (
              <div className="flex justify-between pb-2 border-b border-[#1A1A1A]">
                <span>TRANSACTION REF ID:</span>
                <span className="text-emerald-400 font-mono font-semibold">{transactionId}</span>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span>TOTAL PAID:</span>
              <span className="text-white font-bold text-sm">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4">
                RETURN TO CATALOGUE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-36 pb-24 px-6 flex flex-col items-center justify-center text-center space-y-6">
        <ShoppingBag className="w-12 h-12 text-[#666666]" />
        <h2 className="font-sans text-2xl font-bold text-white uppercase tracking-widest">
          YOUR BAG IS EMPTY
        </h2>
        <p className="text-xs text-[#888888]">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/shop">
          <Button variant="primary" size="lg">
            EXPLORE CATALOGUE
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-6">
          <div>
            <nav className="flex items-center gap-2 text-xs font-sans text-[#888888] uppercase tracking-widest mb-2">
              <Link href="/cart" className="hover:text-white transition-colors">BAG</Link>
              <ChevronRight className="w-3 h-3 text-[#666666]" />
              <span className="text-white font-medium">CHECKOUT</span>
            </nav>
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              SECURE CHECKOUT
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[#888888] uppercase tracking-wider hidden sm:flex">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">1</span>
                  CONTACT INFORMATION
                </h2>
                <Link href="/login" className="text-[11px] font-sans text-[#888888] hover:text-white tracking-widest uppercase">
                  LOG IN
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    PHONE NUMBER (FOR SMS DISPATCH) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping & Country/Region */}
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 space-y-5">
              <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2 pb-3 border-b border-[#1A1A1A]">
                <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">2</span>
                SHIPPING & DESTINATION
              </h2>

              {/* Country / Region Selector */}
              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                  COUNTRY / REGION *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors uppercase"
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                  STREET ADDRESS *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House / Apartment number & street name"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    APARTMENT / SUITE
                  </label>
                  <input
                    type="text"
                    placeholder="Apt, Suite, Unit"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    CITY *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                    POSTAL / ZIP CODE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 space-y-4">
              <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2 pb-3 border-b border-[#1A1A1A]">
                <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">3</span>
                SHIPPING METHOD
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod("express")}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === "express"
                      ? "bg-[#111111] border-white"
                      : "bg-[#050505] border-[#222222] hover:border-[#444444]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-white" />
                    <div>
                      <p className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        EXPRESS COURIER DISPATCH
                      </p>
                      <p className="text-[11px] font-sans text-[#888888]">2-4 Business Days Delivery</p>
                    </div>
                  </div>
                  <span className="font-sans text-xs font-bold text-white">
                    {subtotal > 200 ? "FREE" : "$25.00"}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "bg-[#111111] border-white"
                      : "bg-[#050505] border-[#222222] hover:border-[#444444]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#888888]" />
                    <div>
                      <p className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        STANDARD FREIGHT DISPATCH
                      </p>
                      <p className="text-[11px] font-sans text-[#888888]">5-7 Business Days Delivery</p>
                    </div>
                  </div>
                  <span className="font-sans text-xs font-bold text-white">$15.00</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Method Selection */}
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 space-y-5">
              <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2 pb-3 border-b border-[#1A1A1A]">
                <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">4</span>
                PAYMENT METHOD
              </h2>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 border text-center transition-all ${
                    paymentMethod === "cod"
                      ? "bg-white text-black border-white font-bold shadow-lg"
                      : "bg-[#050505] text-[#888888] border-[#222222] hover:text-white hover:border-[#444444]"
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1.5" />
                  <span className="text-[10px] font-sans tracking-wider uppercase block">CASH ON DELIVERY</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("nayapay")}
                  className={`p-3.5 border text-center transition-all ${
                    paymentMethod === "nayapay"
                      ? "bg-white text-black border-white font-bold shadow-lg"
                      : "bg-[#050505] text-[#888888] border-[#222222] hover:text-white hover:border-[#444444]"
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1.5" />
                  <span className="text-[10px] font-sans tracking-wider uppercase block">NAYAPAY</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("easypaisa")}
                  className={`p-3.5 border text-center transition-all ${
                    paymentMethod === "easypaisa"
                      ? "bg-white text-black border-white font-bold shadow-lg"
                      : "bg-[#050505] text-[#888888] border-[#222222] hover:text-white hover:border-[#444444]"
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1.5" />
                  <span className="text-[10px] font-sans tracking-wider uppercase block">EASYPAISA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("jazzcash")}
                  className={`p-3.5 border text-center transition-all ${
                    paymentMethod === "jazzcash"
                      ? "bg-white text-black border-white font-bold shadow-lg"
                      : "bg-[#050505] text-[#888888] border-[#222222] hover:text-white hover:border-[#444444]"
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1.5" />
                  <span className="text-[10px] font-sans tracking-wider uppercase block">JAZZCASH</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3.5 border text-center transition-all ${
                    paymentMethod === "bank"
                      ? "bg-white text-black border-white font-bold shadow-lg"
                      : "bg-[#050505] text-[#888888] border-[#222222] hover:text-white hover:border-[#444444]"
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1.5" />
                  <span className="text-[10px] font-sans tracking-wider uppercase block">BANK DEPOSIT</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="pt-3">
                {/* Cash on Delivery */}
                {paymentMethod === "cod" && (
                  <div className="p-5 bg-[#050505] border border-[#222222] space-y-2">
                    <p className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                      CASH ON DELIVERY (COD)
                    </p>
                    <p className="text-xs font-sans text-[#888888] leading-relaxed">
                      Pay in cash upon delivery of your order directly to the courier agent at your shipping destination address.
                    </p>
                  </div>
                )}

                {/* NayaPay */}
                {paymentMethod === "nayapay" && (
                  <div className="p-5 bg-[#050505] border border-[#222222] space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        NAYAPAY TRANSFER DETAILS
                      </span>
                      <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest">
                        INSTANT TRANSFER
                      </span>
                    </div>

                    <div className="space-y-2 font-sans text-xs">
                      <div className="flex justify-between text-[#888888]">
                        <span>ACCOUNT TITLE:</span>
                        <strong className="text-white">Khawaja Idrees</strong>
                      </div>
                      <div className="flex justify-between items-center text-[#888888]">
                        <span>NAYAPAY NUMBER:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono text-sm">03123456789</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("03123456789", "nayapay")}
                            className="p-1 text-[#888888] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {copiedText === "nayapay" && (
                        <p className="text-[10px] text-emerald-400 text-right">COPIED TO CLIPBOARD</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                        TRANSACTION REFERENCE ID (TRX ID)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TRX-9823471"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* EasyPaisa */}
                {paymentMethod === "easypaisa" && (
                  <div className="p-5 bg-[#050505] border border-[#222222] space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        EASYPAISA TRANSFER DETAILS
                      </span>
                      <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest">
                        INSTANT TRANSFER
                      </span>
                    </div>

                    <div className="space-y-2 font-sans text-xs">
                      <div className="flex justify-between text-[#888888]">
                        <span>ACCOUNT TITLE:</span>
                        <strong className="text-white">Khawaja Idrees</strong>
                      </div>
                      <div className="flex justify-between items-center text-[#888888]">
                        <span>EASYPAISA NUMBER:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono text-sm">03123456789</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("03123456789", "easypaisa")}
                            className="p-1 text-[#888888] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {copiedText === "easypaisa" && (
                        <p className="text-[10px] text-emerald-400 text-right">COPIED TO CLIPBOARD</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                        TRANSACTION REFERENCE ID (TRX ID)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 892301984"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* JazzCash */}
                {paymentMethod === "jazzcash" && (
                  <div className="p-5 bg-[#050505] border border-[#222222] space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        JAZZCASH TRANSFER DETAILS
                      </span>
                      <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest">
                        INSTANT TRANSFER
                      </span>
                    </div>

                    <div className="space-y-2 font-sans text-xs">
                      <div className="flex justify-between text-[#888888]">
                        <span>ACCOUNT TITLE:</span>
                        <strong className="text-white">Khawaja Idrees</strong>
                      </div>
                      <div className="flex justify-between items-center text-[#888888]">
                        <span>JAZZCASH NUMBER:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono text-sm">03123456789</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("03123456789", "jazzcash")}
                            className="p-1 text-[#888888] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {copiedText === "jazzcash" && (
                        <p className="text-[10px] text-emerald-400 text-right">COPIED TO CLIPBOARD</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                        TRANSACTION REFERENCE ID (TRX ID)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 019284712"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Bank Deposit */}
                {paymentMethod === "bank" && (
                  <div className="p-5 bg-[#050505] border border-[#222222] space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">
                        BANK ALFALAH DIRECT DEPOSIT
                      </span>
                      <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest">
                        BANK WIRE / IBFT
                      </span>
                    </div>

                    <div className="space-y-2 font-sans text-xs">
                      <div className="flex justify-between text-[#888888]">
                        <span>BANK NAME:</span>
                        <strong className="text-white">Bank Alfalah</strong>
                      </div>
                      <div className="flex justify-between text-[#888888]">
                        <span>ACCOUNT TITLE:</span>
                        <strong className="text-white">Khawaja Idrees</strong>
                      </div>
                      <div className="flex justify-between items-center text-[#888888]">
                        <span>ACCOUNT NUMBER:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono">1002-89410294-01</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("1002-89410294-01", "acc")}
                            className="p-1 text-[#888888] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[#888888]">
                        <span>IBAN NUMBER:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono text-[11px]">PK36ALFH1002008941029401</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard("PK36ALFH1002008941029401", "iban")}
                            className="p-1 text-[#888888] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {copiedText && (
                        <p className="text-[10px] text-emerald-400 text-right">COPIED TO CLIPBOARD</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#888888] tracking-widest uppercase mb-1.5">
                        BANK TRANSFER REFERENCE / DEPOSIT RECEIPT NO.
                      </label>
                      <input
                        type="text"
                        placeholder="Enter deposit slip or online reference number"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#222222] px-4 py-3 text-xs text-white font-sans focus:outline-none focus:border-white/60 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-white text-black font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#E0E0E0] transition-colors shadow-2xl disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? "PROCESSING TRANSACTION..." : `PLACE ORDER (${formatPrice(grandTotal)})`}</span>
            </button>
          </div>

          {/* Right Column: Order Items Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase pb-4 border-b border-[#1A1A1A]">
              ORDER SUMMARY ({items.length} ITEMS)
            </h2>

            {/* Items List */}
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex gap-4 pb-4 border-b border-[#1A1A1A]">
                  <div className="relative w-16 h-20 bg-[#050505] border border-[#222222] flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-white uppercase">{item.product.name}</h4>
                      <p className="text-[11px] font-sans text-[#888888]">SIZE: {item.selectedSize} | QTY: {item.quantity}</p>
                    </div>
                    <span className="font-sans text-xs font-semibold text-white">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="space-y-3 font-sans text-xs text-[#888888] pt-2">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>ESTIMATED TAX</span>
                <span className="text-white font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING ({shippingMethod.toUpperCase()})</span>
                <span className="text-white font-medium">{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#1A1A1A] font-sans text-sm font-bold text-white">
                <span>TOTAL</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
