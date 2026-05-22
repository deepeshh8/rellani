export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  care: string[];
  category: string;
  subcategory: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}
