import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductPreview3D } from "@/components/product/product-preview-3d";
import { getProductByIdOrSlug } from "@/lib/store";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-gap">
      <section className="container-shell">
        <Link href="/shop" className="mb-5 inline-flex text-sm font-semibold text-[var(--accent)]">
          Back to shop
        </Link>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {(product.images?.length ? product.images : ["/logo.png"]).map((image, index) => (
              <div
                key={`${product.id}-${index}`}
                className="premium-panel relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="premium-panel h-fit p-5 sm:p-6">
            <div className="premium-pill mb-3">
              {product.category}
            </div>
            <h1 className="font-display text-[3rem] leading-[0.9]">{product.name}</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{product.description}</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-semibold text-[var(--accent)]">{formatPrice(product.price)}</span>
              {product.compareAtPrice ? (
                <span className="text-[var(--muted)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
              <div className="premium-subtle p-3">Gender: {product.gender}</div>
              <div className="premium-subtle p-3">Stock: {product.stock}</div>
            </div>
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>
            <ProductPreview3D images={product.images} />
          </div>
        </div>
      </section>
    </main>
  );
}
