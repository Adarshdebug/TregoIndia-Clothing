import Link from "next/link";

export default async function CheckoutSuccessPage({ searchParams }) {
  const params = await searchParams;

  return (
    <main className="page-gap">
      <section className="container-shell">
        <div className="surface mx-auto max-w-xl p-6 text-center sm:p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Order confirmed
          </div>
          <h1 className="mt-3 text-3xl font-semibold">Thank you for shopping with TregoIndia.</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Your order {params?.orderId ? `#${params.orderId}` : ""} has been placed successfully.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="button-primary">
              Continue shopping
            </Link>
            <Link href="/profile" className="button-secondary">
              View profile
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
