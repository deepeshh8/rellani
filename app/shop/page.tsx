"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { products, collections } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist-context";
import { Product } from "@/lib/types";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group">
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
          {product.isNew && (
            <span className="absolute top-4 left-4 px-2 py-1 bg-background text-xs uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="absolute top-4 left-4 px-2 py-1 bg-background text-xs uppercase tracking-wider">
              Bestseller
            </span>
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
          onClick={() =>
            inWishlist ? removeItem(product.id) : addItem(product)
          }
          className="p-1 -m-1"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              inWishlist
                ? "fill-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          />
        </button>
      </div>
    </div>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");

  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryParam
  );
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Update category when URL params change
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by special filters
    if (filterParam === "new") {
      result = result.filter((p) => p.isNew);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Featured: bestsellers first
        result = result
          .filter((p) => p.isBestseller)
          .concat(result.filter((p) => !p.isBestseller));
    }

    return result;
  }, [activeCategory, sortBy, filterParam]);

  const currentCollection = collections.find((c) => c.slug === activeCategory);

  const handleCategoryClick = useCallback((slug: string | null) => {
    setActiveCategory(slug);
  }, []);

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl">
            {currentCollection ? currentCollection.name : "All Products"}
          </h1>
          {currentCollection && (
            <p className="text-muted-foreground mt-2">
              {currentCollection.description}
            </p>
          )}
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleCategoryClick(null)}
              className={cn(
                "text-sm transition-colors",
                !activeCategory
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => handleCategoryClick(collection.slug)}
                className={cn(
                  "text-sm transition-colors",
                  activeCategory === collection.slug
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {collection.name}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>

          {/* Results Count & Sort */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-sm"
              >
                Sort by: {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-background border border-border shadow-lg z-50 min-w-[180px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={cn(
                          "block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors",
                          sortBy === option.value && "bg-secondary"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <>
        <div
          className={cn(
            "fixed inset-0 bg-foreground/20 z-50 transition-opacity duration-300 lg:hidden",
            isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileFilterOpen(false)}
        />
        <div
          className={cn(
            "fixed top-0 left-0 bottom-0 w-[280px] bg-background z-50 transition-transform duration-300 lg:hidden",
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-medium">Filter</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 -m-2"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="px-6">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                  Category
                </h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => {
                        handleCategoryClick(null);
                        setIsMobileFilterOpen(false);
                      }}
                      className={cn(
                        "text-sm transition-colors",
                        !activeCategory
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      All Products
                    </button>
                  </li>
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <button
                        onClick={() => {
                          handleCategoryClick(collection.slug);
                          setIsMobileFilterOpen(false);
                        }}
                        className={cn(
                          "text-sm transition-colors",
                          activeCategory === collection.slug
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {collection.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 lg:py-12">
          <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
            <div className="h-10 bg-secondary animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] bg-secondary animate-pulse mb-4" />
                  <div className="h-4 bg-secondary animate-pulse mb-2" />
                  <div className="h-4 w-20 bg-secondary animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
