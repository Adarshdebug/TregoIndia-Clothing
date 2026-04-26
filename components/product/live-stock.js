"use client";

import { useEffect, useState } from "react";

export function LiveStock({ slug, initialStock }) {
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    let active = true;
    async function refresh() {
      const res = await fetch("/api/stock", { cache: "no-store" });
      const data = await res.json();
      if (!active || !data.items) return;
      const match = data.items.find((item) => item.slug === slug);
      if (match) {
        setStock(match.stock);
      }
    }

    refresh();
    const timer = setInterval(refresh, 15000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [slug]);

  if (stock <= 0) {
    return <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">Out of stock</span>;
  }

  return (
    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
      {stock < 6 ? `Only ${stock} left` : `${stock} in stock`}
    </span>
  );
}
