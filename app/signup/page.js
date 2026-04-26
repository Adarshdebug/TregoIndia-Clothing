"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers";

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/auth/signup", {
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
        <div className="premium-pill">Create account</div>
        <h1 className="font-display text-[3rem] leading-[0.9]">Sign up</h1>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="premium-input"
        />
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
        <button className="premium-button w-full">Create account</button>
        <p className="text-sm text-white/55">
          Already with us? <Link href="/login" className="text-[var(--accent)]">Login</Link>
        </p>
      </form>
    </main>
  );
}
