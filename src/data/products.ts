export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: "hoodies" | "tshirts" | "pants" | "accessories";
  collection: "oblivion" | "cyber-goth" | "matrix-essentials";
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
  care: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
  image: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "HOODIES",
    slug: "hoodies",
    count: "10+ ITEMS",
    image: "/images/layout/cat-hoodies.png",
  },
  {
    id: "cat-2",
    name: "T-SHIRTS",
    slug: "tshirts",
    count: "15+ ITEMS",
    image: "/images/layout/cat-tshirts.png",
  },
  {
    id: "cat-3",
    name: "PANTS",
    slug: "pants",
    count: "8+ ITEMS",
    image: "/images/layout/cat-pants.png",
  },
  {
    id: "cat-4",
    name: "ACCESSORIES",
    slug: "accessories",
    count: "7+ ITEMS",
    image: "/images/layout/cat-accessories.png",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Essential Hoodie",
    slug: "essential-hoodie",
    price: 6500,
    originalPrice: 8500,
    description:
      "Timeless silhouette crafted from heavy 500GSM organic French Terry cotton. Engineered with a double-layered hood, dropped shoulders, and subtle MORT branding on back.",
    category: "hoodies",
    collection: "oblivion",
    images: ["/images/layout/prod-hoodie.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#1F1F1F" },
    ],
    details: [
      "500GSM Heavyweight French Terry",
      "Signature MORT Minimal Print",
      "Double-lined Crossover Hood",
      "Ribbed Cuffs & Hem",
      "Pre-shrunk Fabric",
    ],
    care: [
      "Machine wash cold inside out",
      "Do not tumble dry",
      "Iron low temperature",
      "Do not dry clean",
    ],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42,
  },
  {
    id: "prod-2",
    name: "Minimal T-Shirt",
    slug: "minimal-t-shirt",
    price: 3200,
    originalPrice: 4200,
    description:
      "Heavyweight 280GSM combed cotton jersey t-shirt. Features a relaxed boxy cut, ribbed collar, and understated tonal chest branding.",
    category: "tshirts",
    collection: "oblivion",
    images: ["/images/layout/prod-tshirt.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Black", hex: "#141414" },
      { name: "Raw Off-White", hex: "#EBEBE6" },
    ],
    details: [
      "280GSM Heavyweight Jersey",
      "Relaxed Boxy Fit",
      "Reinforced Crewneck Collar",
      "Twin Needle Stitched Hems",
    ],
    care: ["Machine wash cold", "Line dry in shade", "Do not bleach"],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 38,
  },
  {
    id: "prod-3",
    name: "Utility Cargo Pants",
    slug: "utility-cargo-pants",
    price: 6800,
    originalPrice: 9000,
    description:
      "Technical relaxed cargo trousers featuring 6 functional utility pockets, adjustable ankle cinch drawstrings, and YKK zipper hardware.",
    category: "pants",
    collection: "oblivion",
    images: ["/images/layout/prod-pants.png"],
    sizes: ["30", "32", "34", "36"],
    colors: [{ name: "Pitch Black", hex: "#0D0D0D" }],
    details: [
      "Water-resistant Cotton-Poly Ripstop",
      "6 Tactical Cargo Pockets",
      "Adjustable Ankle Cinch Straps",
      "YKK AquaGuard Zippers",
    ],
    care: ["Wash with like colors", "Do not iron print", "Hang dry"],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 29,
  },
  {
    id: "prod-4",
    name: "Signature Cap",
    slug: "signature-cap",
    price: 2800,
    originalPrice: 3800,
    description:
      "Unstructured 6-panel cap constructed from heavy cotton twill with embroidered MORT wordmark front branding and matte metal strap closure.",
    category: "accessories",
    collection: "oblivion",
    images: ["/images/layout/prod-cap.png"],
    sizes: ["ONE SIZE"],
    colors: [{ name: "Matte Black", hex: "#111111" }],
    details: [
      "100% Heavyweight Cotton Twill",
      "3D Embroidered MORT Logo",
      "Adjustable Metal Buckle Strap",
      "Pre-curved Visor",
    ],
    care: ["Spot clean only", "Do not submerge"],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 64,
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-1",
    title: "OBLIVION ARCHIVE",
    slug: "oblivion",
    tagline: "RESTRAINT & HEAVYWEIGHT SILHOUETTES",
    description:
      "Drop 04 features 500GSM French Terry hoodies, 280GSM heavy jersey tees, and tactical utility cargo pants designed with purpose.",
    image: "/images/layout/oblivion-archive.png",
    itemCount: 10,
  },
  {
    id: "col-2",
    title: "CYBER-GOTH '26",
    slug: "cyber-goth",
    tagline: "INDUSTRIAL HARDWARE & UTILITY",
    description:
      "Modular outerwear and magnetic buckle accessories built for urban exploration.",
    image: "/images/layout/cyber-goth.jpg",
    itemCount: 8,
  },
  {
    id: "col-3",
    title: "MATRIX ESSENTIALS",
    slug: "matrix-essentials",
    tagline: "PURE MONOCHROME CORE",
    description:
      "Minimalist oversized essential tees and caps crafted for daily wear.",
    image: "/images/layout/cat-tshirts.png",
    itemCount: 15,
  },
];
