import Image from "next/image";
import Link from "next/link";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

export function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id || product._id}`}
      className="premium-panel overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(242,194,123,0.22)]"
    >
      <div className="relative aspect-[4/5] bg-[var(--surface-alt)]">
        <Image
          src={product.images?.[0] || "/logo.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.18)_74%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-none">{product.name}</h3>
            <p className="text-sm text-[var(--muted)]">
              {product.category} - {product.gender}
            </p>
          </div>
          <span className="rounded-full border border-[rgba(242,194,123,0.16)] bg-[rgba(242,194,123,0.08)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            {product.stock > 0 ? "In stock" : "Sold out"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--accent)]">{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-[var(--muted)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
