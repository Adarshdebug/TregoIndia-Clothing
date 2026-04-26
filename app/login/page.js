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
    <main className="container-shell py-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md touch-card space-y-4 p-6">
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
        />
        <button className="w-full rounded-full bg-white px-5 py-4 text-sm font-semibold text-black">Login</button>
        <p className="text-sm text-white/55">
          New here? <Link href="/signup" className="text-white">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
