import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { IntroSplash } from "@/components/intro/intro-splash";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/store";

const quickLinks = [
  { label: "New in", href: "/products?trending=true" },
  { label: "Oversized", href: "/products?category=Oversized" },
  { label: "Streetwear", href: "/products?category=Streetwear" },
  { label: "Women", href: "/products?category=Women" }
];

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });
  const newArrivals = await getProducts({ trending: true });
  const heroProduct = featuredProducts[0] || newArrivals[0];

  return (
    <>
      <IntroSplash />
      <main className="page-gap">
        <section className="container-shell">
          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
            <div className="surface-alt overflow-hidden p-5 sm:p-8">
              <div className="inline-flex rounded-full bg-[var(--surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                TregoIndia Clothing
              </div>
              <h1 className="mt-4 max-w-2xl text-[2rem] font-semibold leading-[1.02] sm:text-5xl">
                Monochrome fits built for mobile-first shopping.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-[15px]">
                Quick discovery, touch-friendly browsing, and sharp essentials that land fast and
                look clean from the first scroll.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/shop" className="button-primary w-full sm:w-auto">
                  Shop now
                  <ArrowRight size={18} />
                </Link>
                <Link href="/products?trending=true" className="button-secondary w-full sm:w-auto">
                  Browse trending
                </Link>
              </div>
              <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)]/88 transition hover:border-[var(--accent)]/35"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <Feature icon={Zap} title="Fast" copy="Clean mobile loading." />
                <Feature icon={Truck} title="Checkout" copy="Quick path to order." />
                <Feature icon={ShieldCheck} title="Trusted" copy="Secure account flow." />
              </div>
            </div>

            <div className="surface relative overflow-hidden">
              <div className="relative aspect-[4/5] min-h-[460px] sm:min-h-[540px] lg:min-h-full">
                <Image
                  src={heroProduct?.images?.[0] || "/logo.png"}
                  alt={heroProduct?.name || "Featured TregoIndia clothing"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.2)_30%,rgba(5,5,5,0.82)_100%)]" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                  <div className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur">
                    Featured drop
                  </div>
                  <div className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/75 backdrop-blur">
                    Scroll-worthy fits
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="rounded-[24px] border border-white/12 bg-black/55 p-4 backdrop-blur-xl sm:p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                      {heroProduct?.category || "Latest arrival"}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {heroProduct?.name || "TregoIndia drop"}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/72">
                      Built for fast taps, clean silhouettes, and easy outfit picks on smaller
                      screens.
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Starting at</p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {formatPrice(heroProduct?.price)}
                        </p>
                      </div>
                      <Link
                        href={heroProduct ? `/product/${heroProduct.id || heroProduct._id}` : "/shop"}
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black"
                      >
                        View piece
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell mt-10">
          <div className="surface overflow-hidden p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  New launch
                </div>
                <h2 className="mt-4 max-w-lg text-3xl font-semibold sm:text-4xl">
                  Latest drop, tuned for the thumb.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  The newest release stays visible up front, with a tighter layout that feels more
                  like a fashion feed than a dense storefront on mobile.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/shop" className="button-primary">
                    Explore launch
                  </Link>
                  <Link href="/profile" className="button-secondary">
                    Save to profile
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-black">
                <video
                  className="block aspect-[16/10] w-full object-cover"
                  src="/videos/new-launch.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Featured collection</h2>
              <p className="text-sm text-[var(--muted)]">High-conviction pieces for daily rotation.</p>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-[var(--accent)]">
              View all
            </Link>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id || product._id} className="w-[78vw] max-w-[280px] shrink-0 snap-start lg:w-auto lg:max-w-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="container-shell mt-10">
          <div className="surface grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <h2 className="text-2xl font-semibold">New arrivals</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Fresh stock, quick details, and product pages that stay focused on what matters.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {newArrivals.slice(0, 2).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Feature({ icon: Icon, title, copy }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-4">
      <Icon size={18} className="mb-3" />
      <div className="text-sm font-semibold sm:text-base">{title}</div>
      <p className="mt-1 text-xs leading-5 text-[var(--muted)] sm:text-sm">{copy}</p>
    </div>
  );
}

function formatPrice(price) {
  if (!price) {
    return "Explore now";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}
