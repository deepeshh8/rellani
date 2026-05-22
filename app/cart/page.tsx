"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal >= 250 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-serif text-3xl mb-4">Your Bag is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your bag yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
            >
              Continue Shopping
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
        <h1 className="font-serif text-3xl lg:text-4xl mb-8">Shopping Bag</h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border-b border-border pb-4 mb-6 hidden md:grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 text-sm text-muted-foreground">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 md:grid md:grid-cols-[2fr,1fr,1fr,1fr] md:items-center pb-6 border-b border-border"
                >
                  {/* Product */}
                  <div className="flex gap-4">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-24 h-32 relative overflow-hidden bg-secondary flex-shrink-0"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.color} / {item.size}
                      </p>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.size, item.color)
                        }
                        className="mt-auto text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-secondary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="hidden md:block text-sm text-right">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Total */}
                  <div className="hidden md:flex items-center justify-end gap-4">
                    <p className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="bg-secondary p-6 lg:p-8">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 250 && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatPrice(250 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 mt-6 bg-foreground text-background text-center text-sm hover:bg-foreground/90 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full py-4 mt-3 border border-foreground text-center text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
