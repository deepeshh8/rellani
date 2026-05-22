"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = query.length > 0
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] bg-background transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        {/* Search Header */}
        <div className="flex items-center justify-between h-16 lg:h-20 border-b border-border">
          <div className="flex items-center flex-1 gap-4">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button onClick={onClose} className="p-2 -m-2" aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="py-8">
          {query.length === 0 ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Silk Dress", "Linen Set", "Bodysuit", "Resort Wear"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-border hover:bg-secondary transition-colors text-sm"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-secondary mb-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-sm">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No products found for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
