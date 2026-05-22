"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { SearchOverlay } from "./search-overlay";
import { MobileMenu } from "./mobile-menu";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Essentials", href: "/shop?category=essentials" },
  { name: "Dresses", href: "/shop?category=dresses" },
  { name: "Resort", href: "/shop?category=resort" },
  { name: "Sets", href: "/shop?category=sets" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        {/* Announcement Bar */}
        <div className="bg-foreground text-background text-xs text-center py-2 px-4">
          <p>Complimentary shipping on orders over $250</p>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm tracking-wide underline-animation"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Logo - Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-xl lg:text-2xl tracking-[0.2em] uppercase"
            >
              Rellani
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 -m-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/about"
                className="hidden lg:block text-sm tracking-wide underline-animation"
              >
                About
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2 -m-2"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="hidden lg:block p-2 -m-2"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 -m-2"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[104px] lg:h-[112px]" />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
