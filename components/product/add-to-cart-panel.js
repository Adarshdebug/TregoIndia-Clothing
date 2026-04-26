"use client";

import { useState } from "react";
import { useCart } from "@/components/providers";
import { Price } from "@/components/ui/price";
import { LiveStock } from "@/components/product/live-stock";

export function AddToCartPanel({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  function handleAdd() {
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      size,
      quantity
    });
  }

  return (
    <>
      <div className="touch-card space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{product.category}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{product.name}</h1>
          </div>
          <LiveStock slug={product.slug} initialStock={product.stock} />
        </div>

        <Price price={product.price} compareAtPrice={product.compareAtPrice} />
        <p className="text-sm leading-7 text-white/65">{product.description}</p>

        <div>
          <p className="mb-3 text-sm font-medium">Select size</p>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((value) => (
              <button
                key={value}
                onClick={() => setSize(value)}
                className={`rounded-2xl border px-3 py-3 text-sm ${
                  size === value ? "border-white bg-white text-black" : "border-white/10 bg-white/5"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="glass h-11 w-11 rounded-full"
          >
            -
          </button>
          <div className="glass flex h-11 min-w-16 items-center justify-center rounded-full px-4">
            {quantity}
          </div>
          <button onClick={() => setQuantity((value) => value + 1)} className="glass h-11 w-11 rounded-full">
            +
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-20 z-40 p-4 md:static md:p-0">
        <button
          onClick={handleAdd}
          disabled={product.stock <= 0}
          className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/30"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
