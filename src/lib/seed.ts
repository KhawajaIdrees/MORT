import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { CATEGORIES, COLLECTIONS, PRODUCTS } from "../data/products";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function seed() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const collectionRows = COLLECTIONS.map((col, index) => ({
    name: col.title,
    number: String(index + 1).padStart(2, "0"),
    description: col.description,
    cover_image: col.image,
    slug: col.slug,
    tagline: col.tagline,
    item_count: col.itemCount,
    release_date: new Date().toISOString(),
  }));

  const { error: collectionError } = await supabase
    .from("collections")
    .upsert(collectionRows, { onConflict: "slug" });

  if (collectionError) throw collectionError;

  const productRows = PRODUCTS.map((product) => ({
    name: product.name,
    slug: product.slug,
    collection: product.collection,
    category: product.category,
    price: product.price,
    original_price: product.originalPrice ?? null,
    description: product.description,
    images: product.images,
    colors: product.colors,
    sizes: product.sizes,
    details: product.details,
    care: product.care,
    stock: 37,
    total_stock: 100,
    featured: Boolean(product.isFeatured),
    is_new: Boolean(product.isNew),
    rating: product.rating,
    reviews_count: product.reviewsCount,
    release_date: new Date().toISOString(),
  }));

  const { error: productError } = await supabase
    .from("products")
    .upsert(productRows, { onConflict: "slug" });

  if (productError) throw productError;

  console.log(
    `Seeded ${collectionRows.length} collections, ${productRows.length} products, ${CATEGORIES.length} local categories kept as static UI data.`
  );
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
