"use client";

import { useEffect, useState } from "react";

export function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100" : "scale-[1.02] opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/intro-luxury.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.18)_0%,rgba(5,5,5,0.24)_35%,rgba(5,5,5,0.68)_72%,rgba(5,5,5,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,194,123,0.18),transparent_28%)]" />

      <div
        className={`relative flex h-full w-full flex-col justify-end px-6 pb-16 pt-10 transition-all duration-700 sm:px-10 sm:pb-20 ${
          visible ? "opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-md">
          <div className="inline-flex rounded-full border border-[rgba(242,194,123,0.24)] bg-[rgba(12,10,8,0.5)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] backdrop-blur">
            TregoIndia
          </div>
          <div className="mt-4 max-w-xs text-[2.3rem] font-semibold leading-[0.92] text-white sm:max-w-sm sm:text-[3rem]">
            Premium streetwear in motion.
          </div>
          <div className="mt-3 max-w-xs text-sm leading-6 text-white/72 sm:max-w-sm">
            A softer opening that blends straight into the collection experience.
          </div>
        </div>
      </div>
    </div>
  );
}
