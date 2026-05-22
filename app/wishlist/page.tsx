"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite pieces to revisit them later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl">Wishlist</h1>
          <span className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] relative overflow-hidden bg-secondary mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.images[1] && (
                    <Image
                      src={product.images[1]}
                      alt={product.name}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </div>
              </Link>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-1 -m-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
