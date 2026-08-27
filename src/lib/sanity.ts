import { client } from "@/sanity/client";
import { PRODUCTS, CATEGORIES, COLLECTIONS, Product, Collection, Category } from "@/data/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "mort-streetwear-demo") {
      return PRODUCTS;
    }
    const query = `*[_type == "product"] {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      price,
      originalPrice,
      "category": category->slug.current,
      "collection": collection->slug.current,
      "images": images[].asset->url,
      sizes,
      colors,
      isFeatured,
      isNew,
      rating,
      reviewsCount,
      details,
      care
    }`;
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : PRODUCTS;
  } catch (error) {
    console.warn("Sanity fetch failed, using fallback data:", error);
    return PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const products = await fetchProducts();
    return products.find((p) => p.slug === slug);
  } catch (error) {
    return PRODUCTS.find((p) => p.slug === slug);
  }
}

export async function fetchCollections(): Promise<Collection[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "mort-streetwear-demo") {
      return COLLECTIONS;
    }
    const query = `*[_type == "collection"] {
      "id": _id,
      title,
      "slug": slug.current,
      tagline,
      description,
      "image": image.asset->url,
      "itemCount": count(*[_type == "product" && references(^._id)])
    }`;
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : COLLECTIONS;
  } catch (error) {
    return COLLECTIONS;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "mort-streetwear-demo") {
      return CATEGORIES;
    }
    const query = `*[_type == "category"] {
      "id": _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      "count": count(*[_type == "product" && references(^._id)])
    }`;
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : CATEGORIES;
  } catch (error) {
    return CATEGORIES;
  }
}
