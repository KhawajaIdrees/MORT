"use client";

import React, { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to join waitlist.");
        return;
      }

      setStatus("success");
      setMessage("You are on the early access list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Unable to join waitlist.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#C2B092] text-[#050505] font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#B5A384] transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {status === "loading" ? "JOINING..." : "JOIN NOW"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-xs font-sans text-[#C2B092]">✓ {message}</p>
      )}
      {status === "error" && (
        <p className="text-xs font-sans text-red-400">{message}</p>
      )}
    </form>
  );
}
