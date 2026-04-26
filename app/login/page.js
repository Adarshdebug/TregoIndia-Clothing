"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    setUser(data.user);
    router.push("/profile");
  }

  return (
    <main className="container-shell page-gap">
      <form onSubmit={handleSubmit} className="premium-panel mx-auto max-w-md space-y-4 p-6">
        <div className="premium-pill">Member access</div>
        <h1 className="font-display text-[3rem] leading-[0.9]">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="premium-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          className="premium-input"
        />
        <button className="premium-button w-full">Login</button>
        <p className="text-sm text-white/55">
          New here? <Link href="/signup" className="text-[var(--accent)]">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
