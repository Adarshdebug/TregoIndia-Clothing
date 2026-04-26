"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useCart } from "@/components/providers";

const initialAddress = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  postalCode: ""
};

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [address, setAddress] = useState(initialAddress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canCheckout = useMemo(
    () => cart.length > 0 && Object.values(address).every(Boolean),
    [address, cart.length]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canCheckout) {
      setError("Please complete shipping details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          subtotal,
          discount: 0,
          total: subtotal,
          couponCode: "",
          shippingAddress: address,
          paymentMethod
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Checkout failed.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-gap">
      <section className="container-shell grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="premium-panel p-5 sm:p-6">
          <div className="mb-6">
            <div className="premium-pill">Secure checkout</div>
            <h1 className="font-display mt-4 text-[2.8rem] leading-[0.92]">Complete your order</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {user ? `Checking out as ${user.email}` : "Guest checkout is enabled."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value={address.fullName} onChange={(value) => setAddress((current) => ({ ...current, fullName: value }))} />
            <Field label="Phone" value={address.phone} onChange={(value) => setAddress((current) => ({ ...current, phone: value }))} />
            <Field label="Address" value={address.line1} onChange={(value) => setAddress((current) => ({ ...current, line1: value }))} className="sm:col-span-2" />
            <Field label="City" value={address.city} onChange={(value) => setAddress((current) => ({ ...current, city: value }))} />
            <Field label="State" value={address.state} onChange={(value) => setAddress((current) => ({ ...current, state: value }))} />
            <Field label="Postal code" value={address.postalCode} onChange={(value) => setAddress((current) => ({ ...current, postalCode: value }))} />
          </div>

          <div className="mt-6">
            <span className="label">Payment method</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "stripe", label: "Stripe" },
                { value: "razorpay", label: "Razorpay" }
              ].map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  className={`premium-subtle p-4 text-left ${
                    paymentMethod === method.value ? "border-[rgba(242,194,123,0.28)] bg-[rgba(242,194,123,0.08)]" : ""
                  }`}
                >
                  <div className="font-semibold">{method.label}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">Ready for secure online payment.</div>
                </button>
              ))}
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-[var(--danger)]">{error}</p> : null}

          <button type="submit" disabled={!canCheckout || loading} className="premium-button mt-6 w-full">
            {loading ? "Processing..." : `Pay ${formatPrice(subtotal)}`}
          </button>
        </form>

        <aside className="premium-panel h-fit p-5">
          <h2 className="font-display text-[2rem] leading-none">Order summary</h2>
          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-[var(--muted)]">
                    {item.size} • Qty {item.quantity}
                  </div>
                </div>
                <div>{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[var(--line)] pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="premium-input"
      />
    </div>
  );
}
