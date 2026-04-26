"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[rgba(247,244,239,0.98)] transition-all duration-500 ${
        visible ? "opacity-100" : "scale-105 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ${
          visible ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <Image src="/logo.png" alt="TregoIndia Clothing" width={108} height={108} priority />
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.28em]">TregoIndia</div>
          <div className="text-lg">Clothing</div>
        </div>
      </div>
    </div>
  );
}
