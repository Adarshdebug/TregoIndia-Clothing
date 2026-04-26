"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden rounded-2xl border ${
              active === index ? "border-white" : "border-white/10"
            }`}
          >
            <Image src={image} alt={`${alt} ${index + 1}`} fill sizes="25vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
