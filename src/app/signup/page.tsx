"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.fullName },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.push("/account");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center pt-28 pb-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111111] via-[#050505] to-[#050505] pointer-events-none z-0" />

      <div className="max-w-md w-full relative z-10">
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
            CREATE MORT ACCOUNT
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 border-b border-[#1A1A1A] mb-8 pb-3">
            <Link
              href="/login"
              className="font-sans text-xs font-bold tracking-[0.2em] uppercase pb-2 text-[#666666] hover:text-[#A0A0A0] text-center transition-all"
            >
              SIGN IN
            </Link>
            <Link
              href="/signup"
              className="font-sans text-xs font-bold tracking-[0.2em] uppercase pb-2 text-white text-center relative"
            >
              CREATE ACCOUNT
              <div className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white" />
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#1D0F0F] border border-[#3A1E1E] text-red-400 font-sans text-xs tracking-wider uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block font-sans text-[11px] font-semibold text-[#A0A0A0] tracking-[0.2em] uppercase mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
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

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-[#050505] hover:bg-[#E0E0E0] font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-colors shadow-2xl disabled:opacity-50"
              >
                <span>{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center font-sans text-[11px] text-[#888888] tracking-wider uppercase">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </p>

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
