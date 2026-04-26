"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Scene = dynamic(() => import("@/components/home/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false
});

export function HeroSection() {
  return (
    <section className="container-shell pt-6 sm:pt-8">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="touch-card overflow-hidden p-5 sm:p-8"
        >
          <Badge>Gen Z Luxury Streetwear</Badge>
          <h1 className="headline mt-5 max-w-xl">
            TregoIndia builds monochrome essentials for fast city movement.
          </h1>
          <p className="subcopy mt-5 max-w-lg">
            Premium silhouettes, oversized structure, and clean utility details built mobile-first
            for the next drop culture.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Shop the drop
            </Link>
            <Link
              href="/products?trending=true"
              className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80"
            >
              Trending now
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { label: "48H", value: "Express dispatch" },
              { label: "4.8/5", value: "Community rating" },
              { label: "100%", value: "Mobile optimized" }
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-3">
                <p className="text-lg font-semibold">{item.label}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="touch-card relative min-h-[360px] overflow-hidden"
        >
          <div className="absolute inset-0 hidden md:block">
            <Scene />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_20%)] md:hidden" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <div className="max-w-xs rounded-[28px] border border-white/12 bg-black/55 p-5 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">3D Preview</p>
              <h3 className="mt-2 text-xl font-semibold">Lightweight by design</h3>
              <p className="mt-3 text-sm text-white/65">
                On lower-power mobile devices, the hero gracefully falls back to layered motion and
                gradients for speed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
