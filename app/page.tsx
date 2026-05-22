"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { getFeaturedProducts, collections, getNewArrivals } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist-context";
import { Product } from "@/lib/types";

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
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              sizes="(max-width: 768px) 50vw, 25vw"
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

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Rellani Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-[1440px] w-full px-4 lg:px-8 pb-16 lg:pb-24">
            <div className="max-w-xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
                Quiet Luxury for the Modern Woman
              </h1>
              <p className="text-white/90 text-lg mb-8 text-pretty">
                Timeless essentials crafted from the finest materials. Designed to
                be worn, loved, and kept forever.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground text-sm hover:bg-white/90 transition-colors"
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/shop?category=${collection.slug}`}
                className="group"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-secondary mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                </div>
                <h3 className="font-serif text-lg">{collection.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {collection.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Just In
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-2">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="hidden md:inline-flex items-center gap-2 text-sm underline-animation"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Link
            href="/shop?filter=new"
            className="md:hidden flex items-center justify-center gap-2 mt-8 text-sm underline-animation mx-auto w-fit"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Editorial Split */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-[4/5] relative overflow-hidden bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
                alt="Resort Collection"
                fill
                className="object-cover"
              />
            </div>
            <div className="max-w-lg">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                The Edit
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-6 text-balance">
                Resort 2025: Effortless Elegance
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Escape to warmer horizons with our resort collection. Lightweight
                linens, flowing silks, and sun-kissed neutrals designed for the
                modern traveler. From beach to dinner, transition effortlessly in
                pieces that pack light and look beautiful.
              </p>
              <Link
                href="/shop?category=resort"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
              >
                Shop Resort
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Customer Favorites
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl mt-2">
                Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-sm underline-animation"
            >
              Shop All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 lg:py-24 border-t border-border bg-secondary">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-16 text-center">
            <div>
              <h3 className="font-serif text-xl mb-3">Timeless Design</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                We create pieces meant to last beyond seasons. Classic silhouettes
                with modern refinement.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Quality Materials</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Sourced from the world&apos;s finest mills. Silk, cashmere, and linen
                that feels as good as it looks.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Mindful Production</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Small batch manufacturing with ethical partners. Quality over
                quantity, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram / Editorial Grid */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              @rellani
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl mt-2">
              Follow Our World
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
              "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
            ].map((src, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative overflow-hidden group"
              >
                <Image
                  src={src}
                  alt="Instagram"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
