"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("admin@tregoindia.com");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (data.user.role !== "admin") {
        await fetch("/api/auth/logout", { method: "POST" });
        throw new Error("Admin access only.");
      }

      setUser(data.user);
      router.push("/admin/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#16110d] px-4 text-[#f7f4ef]">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e4c28c]">Admin login</div>
        <h1 className="mt-3 text-3xl font-semibold">TregoIndia dashboard</h1>
        <p className="mt-2 text-sm text-white/70">Hidden from the storefront and available only by direct URL.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="field" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field"
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-[#ffb4b4]">{error}</p> : null}
        <button type="submit" disabled={loading} className="button-primary mt-6 w-full">
          {loading ? "Signing in..." : "Enter admin"}
        </button>
      </form>
    </div>
  );
}
