"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser, booted } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetch("/api/orders", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : { orders: [] }))
        .then((data) => setOrders(data.orders || []));
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const payload = mode === "login" ? { email: form.email, password: form.password } : form;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to continue.");
      }

      setUser(data.user);
      setMessage(mode === "login" ? "Signed in." : "Account created.");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOrders([]);
    router.refresh();
  }

  return (
    <main className="page-gap">
      <section className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="premium-panel p-5 sm:p-6">
          {booted && user ? (
            <>
              <div className="premium-pill">Member profile</div>
              <h1 className="font-display mt-4 text-[2.8rem] leading-[0.92]">Your private account</h1>
              <p className="mt-2 text-sm text-[var(--muted)]">{user.email}</p>
              <div className="mt-5 space-y-3 text-sm">
                <div className="premium-subtle p-4">
                  <div className="font-semibold">{user.name}</div>
                  <div className="mt-1 text-[var(--muted)]">Role: {user.role}</div>
                </div>
              </div>
              <button type="button" onClick={logout} className="premium-button-secondary mt-6">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="mb-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={mode === "login" ? "premium-button" : "premium-button-secondary"}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={mode === "signup" ? "premium-button" : "premium-button-secondary"}
                >
                  Sign up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" ? (
                  <div>
                    <label className="label">Name</label>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      className="premium-input"
                    />
                  </div>
                ) : null}
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="premium-input"
                  />
                </div>
                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="premium-input"
                  />
                </div>
                {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
                <button type="submit" disabled={loading} className="premium-button w-full">
                  {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="premium-panel p-5 sm:p-6">
          <h2 className="font-display text-[2.4rem] leading-none">Orders</h2>
          <div className="mt-5 space-y-4">
            {orders.length ? (
              orders.map((order) => (
                <div key={order._id} className="premium-subtle p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</div>
                    <div className="text-sm text-[var(--muted)]">{order.status}</div>
                  </div>
                  <div className="mt-3 text-sm text-[var(--muted)]">
                    {order.items?.length || 0} item(s) • Rs. {order.total}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--muted)]">
                {user ? "No orders yet." : "Login to view your orders."}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
