"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Order } from "@/types";
import { LogOut, Package } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowser();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setFullName((user.user_metadata?.full_name as string) || "");

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders((data as Order[]) ?? []);
      setLoading(false);
    };

    load();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-36 pb-24 px-6 text-center">
        <p className="font-sans text-xs tracking-widest text-[#8A8A8A]">LOADING ACCOUNT...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-36 pb-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1A1A1A] pb-8">
          <div>
            <span className="text-xs font-sans text-[#A0A0A0] tracking-[0.25em] uppercase">
              CLIENT ACCESS
            </span>
            <h1 className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-tight uppercase mt-2">
              YOUR ACCOUNT
            </h1>
            <p className="mt-3 text-xs font-sans text-[#888888] tracking-wider uppercase">
              {fullName || "MORT MEMBER"} · {email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-5 py-3 border border-white/20 hover:border-white text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            SIGN OUT
          </button>
        </div>

        <section className="space-y-6">
          <h2 className="font-sans text-xs font-bold text-white tracking-[0.2em] uppercase">
            ORDER HISTORY
          </h2>

          {orders.length === 0 ? (
            <div className="py-16 text-center bg-[#0A0A0A] border border-[#1A1A1A] space-y-4">
              <Package className="w-8 h-8 text-[#666666] mx-auto" />
              <p className="font-sans text-xs tracking-widest text-[#888888] uppercase">
                NO ORDERS RECORDED YET
              </p>
              <Link href="/shop">
                <Button variant="primary" size="md">
                  EXPLORE CATALOGUE
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans text-[#888888] uppercase tracking-wider">
                    <span className="text-white font-semibold">
                      ORDER {order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans text-[#A0A0A0]">
                    <span className="uppercase tracking-wider">{order.status}</span>
                    <span className="text-white font-semibold">{formatPrice(order.total)}</span>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-[#1A1A1A]">
                    {order.items?.map((item, idx) => (
                      <div key={`${item.productId}-${idx}`} className="flex justify-between text-xs font-sans text-[#888888]">
                        <span className="text-white uppercase">
                          {item.name} × {item.quantity}
                        </span>
                        <span>{item.selectedSize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
