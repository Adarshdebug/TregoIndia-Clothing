"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductCard } from "@/components/product/product-card";

export function TrendingSlider({ products }) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.15}
      breakpoints={{
        640: { slidesPerView: 1.7 },
        768: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.1 }
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id || product.slug}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
