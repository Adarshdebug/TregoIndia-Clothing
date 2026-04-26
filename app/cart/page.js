"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/providers";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <main className="page-gap">
      <section className="container-shell grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div>
            <div className="premium-pill">Private cart</div>
            <h1 className="font-display mt-4 text-[2.8rem] leading-[0.92]">Review your selection</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              A calmer final pass before you move into checkout.
            </p>
          </div>

          {cart.length ? (
            cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="premium-panel flex gap-4 p-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-lg bg-[var(--surface-alt)]">
                  <Image src={item.image || "/logo.png"} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl leading-none">{item.name}</h2>
                      <p className="text-sm text-[var(--muted)]">Size {item.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="premium-button-secondary !min-h-[38px] !px-3"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="premium-button-secondary !min-h-[38px] !px-3"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="premium-button-secondary !min-h-[38px] !px-3"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="font-semibold text-[var(--accent)]">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="premium-panel p-6">
              <p className="text-[var(--muted)]">Your cart is empty.</p>
              <Link href="/shop" className="premium-button mt-4">
                Continue shopping
              </Link>
            </div>
          )}
        </div>

        <aside className="premium-panel h-fit p-5">
          <h2 className="font-display text-[2rem] leading-none">Summary</h2>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Link
            href={cart.length ? "/checkout" : "/shop"}
            className="premium-button mt-5 flex w-full justify-center"
          >
            {cart.length ? "Proceed to checkout" : "Browse products"}
          </Link>
        </aside>
      </section>
    </main>
  );
}
