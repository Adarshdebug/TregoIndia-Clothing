import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { IntroSplash } from "@/components/intro/intro-splash";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/store";

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });
  const newArrivals = await getProducts({ trending: true });

  return (
    <>
      <IntroSplash />
      <main className="page-gap">
        <section className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-alt overflow-hidden p-6 sm:p-8">
            <div className="mb-8 inline-flex rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Fast everyday drop
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              TregoIndia Clothing built for quick browsing and clean fits.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[var(--muted)]">
              Minimal layers, touch-friendly shopping, and a fast storefront that keeps the focus
              on the product.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="button-primary">
                Shop now
                <ArrowRight size={18} />
              </Link>
              <Link href="/profile" className="button-secondary">
                Your profile
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Feature icon={Zap} title="Fast loading" copy="Lean sections and lazy imagery." />
              <Feature icon={Truck} title="Quick checkout" copy="Stripe or Razorpay-ready flow." />
              <Feature icon={ShieldCheck} title="Reliable admin" copy="JWT-protected back office." />
            </div>
          </div>

          <div className="surface overflow-hidden">
            <div className="relative aspect-[4/5]">
              <Image
                src={featuredProducts[0]?.images?.[0] || "/logo.png"}
                alt="Featured TregoIndia clothing"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
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
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Latest drop in motion.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                  A quick first look at the new TregoIndia release, placed right on the homepage
                  so visitors see the launch immediately.
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
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
            <div className="grid grid-cols-2 gap-4">
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
      <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
      <Icon size={18} className="mb-3" />
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-[var(--muted)]">{copy}</p>
    </div>
  );
}
