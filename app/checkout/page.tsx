"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    phone: "",
    shippingMethod: "standard",
  });

  const shipping = subtotal >= 250 ? 0 : formData.shippingMethod === "express" ? 25 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === "information") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }
  };

  if (items.length === 0 && !orderComplete) {
    router.push("/cart");
    return null;
  }

  if (orderComplete) {
    return (
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Thank You for Your Order</h1>
          <p className="text-muted-foreground mb-2">
            Order confirmation has been sent to {formData.email}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order #RLN-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: "information", label: "Information" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.2em] uppercase mb-8 block"
            >
              Rellani
            </Link>

            {/* Breadcrumb Steps */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cart
              </Link>
              {steps.map((step, index) => (
                <span key={step.key} className="flex items-center gap-2">
                  <span className="text-muted-foreground">/</span>
                  <button
                    onClick={() => index <= currentStepIndex && setCurrentStep(step.key)}
                    disabled={index > currentStepIndex}
                    className={cn(
                      "transition-colors",
                      index <= currentStepIndex
                        ? "text-foreground"
                        : "text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {step.label}
                  </button>
                </span>
              ))}
            </nav>

            <form onSubmit={handleSubmit}>
              {/* Information Step */}
              {currentStep === "information" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Contact</h2>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                          required
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          required
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                        className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          required
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          required
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="ZIP code"
                          required
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Shipping Method</h2>
                    <div className="space-y-3">
                      <label
                        className={cn(
                          "flex items-center justify-between p-4 border cursor-pointer transition-colors",
                          formData.shippingMethod === "standard"
                            ? "border-foreground"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                              formData.shippingMethod === "standard"
                                ? "border-foreground"
                                : "border-muted-foreground"
                            )}
                          >
                            {formData.shippingMethod === "standard" && (
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">Standard Shipping</p>
                            <p className="text-xs text-muted-foreground">
                              5-7 business days
                            </p>
                          </div>
                        </div>
                        <span className="text-sm">
                          {subtotal >= 250 ? "Free" : "$15.00"}
                        </span>
                      </label>

                      <label
                        className={cn(
                          "flex items-center justify-between p-4 border cursor-pointer transition-colors",
                          formData.shippingMethod === "express"
                            ? "border-foreground"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === "express"}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                              formData.shippingMethod === "express"
                                ? "border-foreground"
                                : "border-muted-foreground"
                            )}
                          >
                            {formData.shippingMethod === "express" && (
                              <div className="w-2 h-2 rounded-full bg-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">Express Shipping</p>
                            <p className="text-xs text-muted-foreground">
                              2-3 business days
                            </p>
                          </div>
                        </div>
                        <span className="text-sm">$25.00</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Payment</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Expiration (MM/YY)"
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Security code"
                          className="w-full px-4 py-3 border border-border bg-transparent outline-none focus:border-foreground transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-4">Billing Address</h2>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 border border-border"
                      />
                      <span className="text-sm">Same as shipping address</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === "information") {
                      router.push("/cart");
                    } else if (currentStep === "shipping") {
                      setCurrentStep("information");
                    } else {
                      setCurrentStep("shipping");
                    }
                  }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {currentStep === "information" ? "Return to cart" : "Back"}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={cn(
                    "px-8 py-4 bg-foreground text-background text-sm transition-colors",
                    isProcessing
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-foreground/90"
                  )}
                >
                  {isProcessing
                    ? "Processing..."
                    : currentStep === "payment"
                    ? `Pay ${formatPrice(total)}`
                    : "Continue"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-32 bg-secondary p-6 lg:p-8">
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-20 relative overflow-hidden bg-card flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h3 className="text-sm">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <p className="text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-border pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Complimentary"
                      : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-base pt-3 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
