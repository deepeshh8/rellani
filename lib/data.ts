import { Product, Collection } from "./types";

export const collections: Collection[] = [
  {
    id: "essentials",
    name: "Essentials",
    description: "Timeless pieces for your everyday wardrobe",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
    slug: "essentials",
  },
  {
    id: "dresses",
    name: "Dresses",
    description: "From day to evening, effortlessly elegant",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    slug: "dresses",
  },
  {
    id: "resort",
    name: "Resort",
    description: "Vacation-ready pieces for warmer days",
    image: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80",
    slug: "resort",
  },
  {
    id: "sets",
    name: "Sets",
    description: "Coordinated looks made simple",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    slug: "sets",
  },
];

export const products: Product[] = [
  // ESSENTIALS
  {
    id: "essential-bodysuit-black",
    name: "The Essential Bodysuit",
    price: 98,
    description: "A second-skin essential crafted from premium stretch fabric. Features a square neckline and snap closure for a seamless silhouette under any outfit.",
    details: [
      "Square neckline",
      "Sleeveless design",
      "Snap button closure",
      "Double-lined front",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Lay flat to dry",
      "Cool iron if needed",
    ],
    category: "essentials",
    subcategory: "tops",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "White", value: "#FFFFFF" },
      { name: "Sand", value: "#C2B280" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80",
      "https://images.unsplash.com/photo-1583846783214-dc9e636fa54d?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "fitted-tank-white",
    name: "The Fitted Tank",
    price: 68,
    description: "A refined take on the classic tank. Cut from soft ribbed cotton with a slim fit that flatters every figure.",
    details: [
      "Scoop neckline",
      "Ribbed cotton fabric",
      "Slim fit",
      "Model is 5'10\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
    ],
    category: "essentials",
    subcategory: "tops",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Oat", value: "#E8DFD0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      "https://images.unsplash.com/photo-1583846712268-5842e8a2c5cd?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "wide-leg-trousers",
    name: "Wide Leg Trousers",
    price: 178,
    description: "Elevated everyday trousers with a relaxed, wide leg silhouette. Crafted from premium linen blend for effortless movement.",
    details: [
      "High waisted",
      "Wide leg fit",
      "Side pockets",
      "Linen-cotton blend",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Dry clean recommended",
      "Steam to remove wrinkles",
      "Store folded",
    ],
    category: "essentials",
    subcategory: "bottoms",
    colors: [
      { name: "Ecru", value: "#F5F5DC" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Navy", value: "#1B2838" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "cashmere-sweater",
    name: "Cashmere Crewneck",
    price: 298,
    description: "Luxuriously soft cashmere sweater with a relaxed crewneck silhouette. An investment piece for seasons to come.",
    details: [
      "100% Grade-A cashmere",
      "Relaxed fit",
      "Ribbed trim",
      "Model is 5'8\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store folded with cedar",
      "Do not hang",
    ],
    category: "essentials",
    subcategory: "knitwear",
    colors: [
      { name: "Camel", value: "#C19A6B" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Ivory", value: "#FFFFF0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&q=80",
    ],
    isNew: true,
  },

  // DRESSES
  {
    id: "slip-dress-silk",
    name: "The Silk Slip Dress",
    price: 328,
    description: "Effortless elegance in pure silk. This bias-cut slip dress drapes beautifully and transitions seamlessly from day to evening.",
    details: [
      "100% Mulberry silk",
      "Bias cut",
      "Adjustable straps",
      "Midi length",
      "Model is 5'10\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store on padded hanger",
      "Cool iron on reverse",
    ],
    category: "dresses",
    subcategory: "midi",
    colors: [
      { name: "Champagne", value: "#F7E7CE" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Forest", value: "#228B22" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "linen-maxi-dress",
    name: "Linen Maxi Dress",
    price: 248,
    description: "A summer essential in breathable linen. Features a flattering fitted bodice and flowing maxi skirt.",
    details: [
      "100% European linen",
      "Fitted bodice",
      "Hidden side zip",
      "Floor length",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Line dry",
      "Iron while damp",
    ],
    category: "dresses",
    subcategory: "maxi",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Terracotta", value: "#E2725B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "blazer-dress",
    name: "The Blazer Dress",
    price: 278,
    description: "Power dressing redefined. This structured blazer dress features peak lapels and a flattering nipped waist.",
    details: [
      "Wool-blend fabric",
      "Peak lapels",
      "Double-breasted",
      "Above knee length",
      "Model is 5'8\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store on shaped hanger",
    ],
    category: "dresses",
    subcategory: "mini",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "Camel", value: "#C19A6B" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
    ],
  },
  {
    id: "knit-midi-dress",
    name: "Ribbed Knit Midi",
    price: 198,
    description: "Understated sophistication in a figure-flattering ribbed knit. Perfect for layering or worn alone.",
    details: [
      "Viscose-blend rib knit",
      "High neckline",
      "Long sleeves",
      "Midi length",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Hand wash cold",
      "Lay flat to dry",
      "Do not wring",
    ],
    category: "dresses",
    subcategory: "midi",
    colors: [
      { name: "Chocolate", value: "#3D2314" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Cream", value: "#FFFDD0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
    isBestseller: true,
  },

  // RESORT
  {
    id: "linen-shirt-oversized",
    name: "Oversized Linen Shirt",
    price: 148,
    description: "The perfect vacation staple. This oversized linen shirt works as a cover-up or paired with tailored trousers.",
    details: [
      "100% French linen",
      "Oversized fit",
      "Mother of pearl buttons",
      "Side slits",
      "Model is 5'10\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Tumble dry low",
      "Iron while damp",
    ],
    category: "resort",
    subcategory: "tops",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Sky", value: "#87CEEB" },
      { name: "Sand", value: "#C2B280" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "swimsuit-one-piece",
    name: "The Sculptural One-Piece",
    price: 168,
    description: "Architectural design meets swimwear. Features a plunging neckline and sculpting compression fabric.",
    details: [
      "Italian recycled nylon",
      "UPF 50+",
      "Plunge neckline",
      "Medium coverage",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Rinse after each wear",
      "Hand wash cold",
      "Lay flat to dry",
      "Avoid rough surfaces",
    ],
    category: "resort",
    subcategory: "swim",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "Ivory", value: "#FFFFF0" },
      { name: "Olive", value: "#556B2F" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "sarong-wrap",
    name: "Silk Sarong Wrap",
    price: 128,
    description: "Versatile silk sarong that transforms from beach cover-up to evening wrap. Hand-finished edges.",
    details: [
      "100% Silk",
      "Hand-rolled edges",
      "Generous sizing",
      "Multi-way styling",
    ],
    care: [
      "Dry clean only",
      "Store rolled",
      "Keep away from perfume",
    ],
    category: "resort",
    subcategory: "accessories",
    colors: [
      { name: "Palm", value: "#228B22" },
      { name: "Coral", value: "#FF7F50" },
      { name: "Navy", value: "#1B2838" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    ],
  },
  {
    id: "linen-shorts",
    name: "High-Waist Linen Shorts",
    price: 118,
    description: "Effortless warm-weather dressing. These high-waisted shorts feature a flattering pleated front.",
    details: [
      "100% Linen",
      "High waisted",
      "Pleated front",
      "Side pockets",
      "Model is 5'8\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Iron while damp",
      "Do not tumble dry",
    ],
    category: "resort",
    subcategory: "bottoms",
    colors: [
      { name: "Natural", value: "#F5F5DC" },
      { name: "Black", value: "#0A0A0A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    ],
  },

  // SETS
  {
    id: "linen-set",
    name: "The Linen Set",
    price: 298,
    description: "Coordinate effortlessly with our signature linen set. Includes an oversized shirt and high-waisted trousers.",
    details: [
      "100% French linen",
      "Oversized shirt",
      "High-waisted trousers",
      "Sold as a set",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Line dry recommended",
      "Iron while damp",
    ],
    category: "sets",
    subcategory: "matching",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Sand", value: "#C2B280" },
      { name: "Black", value: "#0A0A0A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "knit-lounge-set",
    name: "Ribbed Lounge Set",
    price: 248,
    description: "Elevated comfort for home and beyond. This ribbed knit set includes a cropped top and wide-leg pants.",
    details: [
      "Soft ribbed knit",
      "Cropped tank top",
      "Wide-leg pants",
      "Elastic waistband",
      "Model is 5'10\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Lay flat to dry",
      "Do not bleach",
    ],
    category: "sets",
    subcategory: "matching",
    colors: [
      { name: "Oat", value: "#E8DFD0" },
      { name: "Charcoal", value: "#36454F" },
      { name: "Cloud", value: "#F0F0F0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1583846783214-dc9e636fa54d?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
    ],
    isNew: true,
  },
  {
    id: "blazer-trouser-set",
    name: "The Power Set",
    price: 428,
    description: "Make a statement with our tailored blazer and trouser set. Modern power dressing at its finest.",
    details: [
      "Wool-blend fabric",
      "Single-breasted blazer",
      "High-waisted trousers",
      "Fully lined",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store on shaped hangers",
    ],
    category: "sets",
    subcategory: "tailored",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "Navy", value: "#1B2838" },
      { name: "Tan", value: "#D2B48C" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
    ],
  },
  {
    id: "bikini-set",
    name: "The Classic Bikini",
    price: 158,
    description: "Timeless two-piece swimwear in recycled Italian fabric. Mix and match sizes for the perfect fit.",
    details: [
      "Italian recycled nylon",
      "UPF 50+",
      "Triangle top",
      "Mid-rise bottom",
      "Model is 5'8\" wearing size S",
    ],
    care: [
      "Rinse after each wear",
      "Hand wash cold",
      "Lay flat to dry",
    ],
    category: "sets",
    subcategory: "swim",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "White", value: "#FFFFFF" },
      { name: "Terracotta", value: "#E2725B" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
      "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80",
    ],
  },

  // Additional essentials
  {
    id: "silk-camisole",
    name: "Silk Camisole",
    price: 148,
    description: "Delicate silk camisole with French seams and adjustable straps. Layer under blazers or wear alone.",
    details: [
      "100% Mulberry silk",
      "French seams",
      "Adjustable straps",
      "V-neckline",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Hand wash cold",
      "Lay flat to dry",
      "Cool iron on reverse",
    ],
    category: "essentials",
    subcategory: "tops",
    colors: [
      { name: "Champagne", value: "#F7E7CE" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Blush", value: "#FFB6C1" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    ],
  },
  {
    id: "tailored-blazer",
    name: "The Tailored Blazer",
    price: 348,
    description: "Investment-worthy tailoring in a single-breasted silhouette. Features a subtle shoulder for a modern line.",
    details: [
      "Italian wool blend",
      "Single-breasted",
      "Two-button closure",
      "Fully lined",
      "Model is 5'10\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store on shaped hanger",
    ],
    category: "essentials",
    subcategory: "outerwear",
    colors: [
      { name: "Black", value: "#0A0A0A" },
      { name: "Ivory", value: "#FFFFF0" },
      { name: "Camel", value: "#C19A6B" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "cotton-tee",
    name: "The Perfect Tee",
    price: 58,
    description: "Our best-selling tee in premium Pima cotton. The perfect weight and drape for everyday wear.",
    details: [
      "100% Pima cotton",
      "Crewneck",
      "Relaxed fit",
      "Pre-washed for softness",
      "Model is 5'9\" wearing size S",
    ],
    care: [
      "Machine wash cold",
      "Tumble dry low",
      "Do not bleach",
    ],
    category: "essentials",
    subcategory: "tops",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Grey", value: "#808080" },
      { name: "Navy", value: "#1B2838" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      "https://images.unsplash.com/photo-1583846712268-5842e8a2c5cd?w=800&q=80",
    ],
    isBestseller: true,
  },
  {
    id: "midi-skirt",
    name: "Satin Midi Skirt",
    price: 168,
    description: "Fluid satin skirt with a bias cut that moves beautifully. Features an invisible side zip.",
    details: [
      "Satin fabric",
      "Bias cut",
      "Midi length",
      "Invisible side zip",
      "Model is 5'8\" wearing size S",
    ],
    care: [
      "Dry clean only",
      "Store hanging",
    ],
    category: "essentials",
    subcategory: "bottoms",
    colors: [
      { name: "Champagne", value: "#F7E7CE" },
      { name: "Black", value: "#0A0A0A" },
      { name: "Burgundy", value: "#722F37" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isBestseller || product.isNew).slice(0, 8);
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew);
}

export function getBestsellers(): Product[] {
  return products.filter((product) => product.isBestseller);
}
