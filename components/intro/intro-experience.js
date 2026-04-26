"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { introAds } from "@/lib/sample-data";

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x: Math.random() * 260 - 130,
        y: Math.random() * 180 - 90
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [1, 0], scale: [1, 0.2], x: dot.x, y: dot.y }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute h-2 w-2 rounded-full bg-white"
          style={{ left: dot.left, top: dot.top }}
        />
      ))}
    </div>
  );
}

export function IntroExperience() {
  const router = useRouter();
  const [stage, setStage] = useState("logo");
  const [ad] = useState(() => introAds[Math.floor(Math.random() * introAds.length)]);

  useEffect(() => {
    const first = setTimeout(() => setStage("break"), 2500);
    const second = setTimeout(() => setStage("ad"), 3600);
    const third = setTimeout(() => router.replace("/home"), 7600);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
      clearTimeout(third);
    };
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#000_0%,#050505_100%)]" />
      <AnimatePresence mode="wait">
        {stage !== "ad" ? (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: stage === "break" ? 1.06 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="glass relative flex h-28 w-28 items-center justify-center rounded-[30px] sm:h-36 sm:w-36">
              <span className="text-3xl font-bold tracking-[0.2em] sm:text-5xl">TI</span>
              {stage === "break" && <Particles />}
            </div>
            <motion.h1
              animate={{ opacity: stage === "break" ? 0.2 : 1 }}
              className="mt-6 text-2xl font-semibold tracking-[0.5em] sm:text-4xl"
            >
              TREGOINDIA
            </motion.h1>
            <p className="mt-2 text-xs uppercase tracking-[0.32em] text-white/55">Clothing</p>
          </motion.div>
        ) : (
          <motion.div
            key="ad"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-black/70 shadow-2xl backdrop-blur-2xl"
          >
            <div className="relative h-[420px] w-full sm:h-[520px]">
              <Image src={ad.image} alt={ad.title} fill className="object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[10px] uppercase tracking-[0.36em] text-white/50">{ad.eyebrow}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{ad.title}</h2>
                <p className="mt-3 max-w-xs text-sm text-white/65">{ad.copy}</p>
                <button
                  onClick={() => router.replace("/home")}
                  className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
                >
                  Skip to store
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
