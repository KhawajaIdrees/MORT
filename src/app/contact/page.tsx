"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        orderNumber: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 4000);
  };

  const faqs = [
    {
      q: "WHEN WILL MY ORDER SHIP?",
      a: "Orders are dispatched within 24-48 business hours via DHL Express courier worldwide.",
    },
    {
      q: "DO YOU RESTOCK ARCHIVED PIECES?",
      a: "No. MORT operates strictly under limited-run batch production (500 units). Archived pieces are never restocked.",
    },
    {
      q: "WHAT IS YOUR RETURN POLICY?",
      a: "Unworn items in original packaging are eligible for return or exchange within 14 days of delivery.",
    },
  ];

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-display text-[#8A8A8A] tracking-[0.25em] uppercase block">
          CLIENT CARE & INQUIRIES
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F0] tracking-tight uppercase">
          CONTACT MORT ARCHIVE
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#8A8A8A]">
          FOR ORDER INQUIRIES, SIZING CONCIERGE, OR PRESS ARCHIVES.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form: 7 cols */}
        <div className="lg:col-span-7 bg-[#151515] border border-[#262626] p-8 sm:p-10 space-y-6">
          <h2 className="font-display text-xl font-bold text-[#F5F5F0] uppercase tracking-wider">
            SEND INQUIRY
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-display text-[#8A8A8A] uppercase mb-1">
                  NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ALEX MERCER"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-xs text-[#F5F5F0] font-sans placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#F5F5F0]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-display text-[#8A8A8A] uppercase mb-1">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ALEX@DOMAIN.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-xs text-[#F5F5F0] font-sans placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#F5F5F0]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-display text-[#8A8A8A] uppercase mb-1">
                  ORDER # (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="#MORT-94820"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-xs text-[#F5F5F0] font-sans placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#F5F5F0]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-display text-[#8A8A8A] uppercase mb-1">
                  TOPIC
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#262626] px-4 py-3 text-xs text-[#F5F5F0] font-display uppercase focus:outline-none focus:border-[#F5F5F0]/40 cursor-pointer"
                >
                  <option value="Order Inquiry">ORDER & SHIPPING STATUS</option>
                  <option value="Returns">RETURNS & EXCHANGE</option>
                  <option value="Sizing">SIZING HELP</option>
                  <option value="Press">PRESS & COLLABORATION</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-display text-[#8A8A8A] uppercase mb-1">
                MESSAGE *
              </label>
              <textarea
                rows={5}
                required
                placeholder="DESCRIBE YOUR INQUIRY..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#262626] p-4 text-xs text-[#F5F5F0] font-sans placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#F5F5F0]/40"
              />
            </div>

            <Button variant="primary" size="lg" type="submit" fullWidth className="gap-2">
              <Send className="w-3.5 h-3.5" />
              <span>SEND MESSAGE</span>
            </Button>
          </form>

          {submitted && (
            <p className="p-4 bg-[#0A0A0A] border border-[#262626] text-[#B8A47E] text-xs font-sans flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>MESSAGE TRANSMITTED. CLIENT CARE WILL RESPOND WITHIN 12 HOURS.</span>
            </p>
          )}
        </div>

        {/* Info: 5 cols */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#151515] border border-[#262626] p-8 space-y-6">
            <h3 className="font-display text-sm font-semibold text-[#F5F5F0] uppercase tracking-wider">
              HEADQUARTERS & STUDIOS
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8A8A8A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F5F5F0] font-display block">TOKYO FLAGSHIP STUDIO</strong>
                  <span className="text-[#8A8A8A]">5-7-22 Minamiaoyama, Minato City, Tokyo 107-0062</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8A8A8A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#F5F5F0] font-display block">EMAIL CONCIERGE</strong>
                  <span className="text-[#8A8A8A]">support@mort-streetwear.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#151515] border border-[#262626] p-8 space-y-6">
            <h3 className="font-display text-sm font-semibold text-[#F5F5F0] uppercase tracking-wider">
              FREQUENTLY ASKED
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[#262626] pb-3 space-y-1">
                  <h4 className="font-display text-xs font-medium text-[#F5F5F0] uppercase">
                    {faq.q}
                  </h4>
                  <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
