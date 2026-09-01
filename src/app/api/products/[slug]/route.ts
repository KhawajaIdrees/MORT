import { NextResponse } from "next/server";
import { fetchProductBySlug } from "@/lib/catalog";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await fetchProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
