import { supabaseAdmin } from "@/lib/supabase/server";
import { mapCollection, mapProduct } from "@/lib/mappers";
import type { Collection, CollectionRow, Product, ProductRow } from "@/types";

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as ProductRow[]).map(mapProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}

export async function fetchCollections(): Promise<Collection[]> {
  const { data, error } = await supabaseAdmin
    .from("collections")
    .select("*")
    .order("number", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as CollectionRow[]).map(mapCollection);
}
