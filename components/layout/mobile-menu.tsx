"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 z-50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[280px] bg-background z-50 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-serif text-lg tracking-[0.2em] uppercase">
              Rellani
            </span>
            <button onClick={onClose} className="p-2 -m-2" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-6 py-3 text-lg hover:bg-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Links */}
          <div className="border-t border-border p-6 space-y-4">
            <Link
              href="/account"
              onClick={onClose}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Account
            </Link>
            <Link
              href="/help"
              onClick={onClose}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Help & Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
