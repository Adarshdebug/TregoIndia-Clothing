"use client";

import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers";

export function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] || "Free");
  const [added, setAdded] = useState(false);
  const disabled = useMemo(() => product.stock < 1, [product.stock]);

  function handleAdd() {
    addItem({
      productId: product.id || product._id,
      name: product.name,
      image: product.images?.[0] || "/logo.png",
      price: product.price,
      size,
      quantity: 1
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Size</label>
        <select
          value={size}
          onChange={(event) => setSize(event.target.value)}
          className="premium-select"
        >
          {(product.sizes || ["Free"]).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="premium-button w-full"
        disabled={disabled}
      >
        <ShoppingBag size={18} />
        <span>{disabled ? "Out of stock" : added ? "Added to cart" : "Add to cart"}</span>
      </button>
    </div>
  );
}
