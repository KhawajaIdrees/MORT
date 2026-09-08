import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/session";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import type { OrderItem, ShippingAddress } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const items = Array.isArray(body.items) ? (body.items as OrderItem[]) : [];
    const total = Number(body.total);
    const status = typeof body.status === "string" ? body.status : "paid";
    const shipping_address = (body.shipping_address ?? null) as ShippingAddress | null;
    const payment_intent_id =
      typeof body.payment_intent_id === "string" ? body.payment_intent_id : null;

    if (!email || items.length === 0 || Number.isNaN(total)) {
      return NextResponse.json({ error: "Invalid order payload." }, { status: 400 });
    }

    const supabase = createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await createSupabaseAdmin()
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        email,
        items,
        total,
        status,
        shipping_address,
        payment_intent_id,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch {
    return NextResponse.json({ error: "Unable to save order." }, { status: 500 });
  }
}
