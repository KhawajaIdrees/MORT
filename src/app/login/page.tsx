"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Check, ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center pt-28 pb-16 px-4 relative overflow-hidden">
      {/* Background Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111111] via-[#050505] to-[#050505] pointer-events-none z-0" />

      <div className="max-w-md w-full relative z-10">
        {/* MORT Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="relative w-40 sm:w-48 h-9 sm:h-10 mx-auto">
              <Image
                src="/logo/mort-logo.png"
                alt="MORT"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </Link>
          <p className="font-sans text-xs text-[#A0A0A0] tracking-[0.25em] uppercase mt-2">
            {mode === "signin" ? "AUTHENTICATE CLIENT ACCESS" : "CREATE MORT ACCOUNT"}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 border-b border-[#1A1A1A] mb-8 pb-3">
            <button
              onClick={() => {
                setMode("signin");
                setSubmitted(false);
              }}
              className={`font-sans text-xs font-bold tracking-[0.2em] uppercase pb-2 transition-all relative ${
                mode === "signin" ? "text-white" : "text-[#666666] hover:text-[#A0A0A0]"
              }`}
            >
              SIGN IN
              {mode === "signin" && (
                <div className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white" />
              )}
            </button>

            <button
              onClick={() => {
                setMode("signup");
                setSubmitted(false);
              }}
              className={`font-sans text-xs font-bold tracking-[0.2em] uppercase pb-2 transition-all relative ${
                mode === "signup" ? "text-white" : "text-[#666666] hover:text-[#A0A0A0]"
              }`}
            >
              CREATE ACCOUNT
              {mode === "signup" && (
                <div className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          </div>

          {/* Success Banner */}
          {submitted && (
            <div className="mb-6 p-4 bg-[#0F1D14] border border-[#1E3A27] flex items-center gap-3 text-emerald-400 font-sans text-xs tracking-wider uppercase animate-fadeIn">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>
                {mode === "signin"
                  ? "AUTHENTICATION SUCCESSFUL. REDIRECTING..."
                  : "ACCOUNT CREATED SUCCESSFULLY. WELCOME TO MORT."}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div>
                <label className="block font-sans text-[11px] font-semibold text-[#A0A0A0] tracking-[0.2em] uppercase mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans tracking-wider focus:outline-none focus:border-white/60 transition-colors placeholder:text-[#444444]"
                />
              </div>
            )}

            <div>
              <label className="block font-sans text-[11px] font-semibold text-[#A0A0A0] tracking-[0.2em] uppercase mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans tracking-wider focus:outline-none focus:border-white/60 transition-colors placeholder:text-[#444444]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-sans text-[11px] font-semibold text-[#A0A0A0] tracking-[0.2em] uppercase">
                  PASSWORD
                </label>
                {mode === "signin" && (
                  <a href="#forgot" className="font-sans text-[10px] text-[#888888] hover:text-white tracking-widest uppercase transition-colors">
                    FORGOT?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#050505] border border-[#222222] px-4 py-3 pr-10 text-xs text-white font-sans tracking-wider focus:outline-none focus:border-white/60 transition-colors placeholder:text-[#444444]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block font-sans text-[11px] font-semibold text-[#A0A0A0] tracking-[0.2em] uppercase mb-2">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[#050505] border border-[#222222] px-4 py-3 text-xs text-white font-sans tracking-wider focus:outline-none focus:border-white/60 transition-colors placeholder:text-[#444444]"
                />
              </div>
            )}

            {mode === "signin" && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-3.5 h-3.5 accent-white bg-[#050505] border-[#222222]"
                />
                <label htmlFor="remember" className="font-sans text-[11px] text-[#A0A0A0] tracking-wider cursor-pointer">
                  REMEMBER SESSION
                </label>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-white text-[#050505] hover:bg-[#E0E0E0] font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors shadow-2xl"
              >
                <span>{mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Bottom Security Footer */}
          <div className="mt-8 pt-6 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] font-sans text-[#666666] tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#888888]" />
              256-BIT ENCRYPTED
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#888888]" />
              SECURE MORT AUTH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
