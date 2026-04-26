import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/store";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts({
    category: params?.category || undefined,
    search: params?.search || undefined
  });

  const categories = ["Oversized", "Streetwear", "Men", "Women"];

  return (
    <main className="page-gap">
      <section className="container-shell">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="premium-pill">Curated catalog</div>
            <h1 className="font-display mt-4 text-[2.8rem] leading-[0.92]">Shop the collection</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Explore the TregoIndia edit through a softer, more premium browsing experience.
            </p>
          </div>
          <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="search"
              name="search"
              defaultValue={params?.search || ""}
              placeholder="Search the collection"
              className="premium-input"
            />
            <select
              name="category"
              defaultValue={params?.category || ""}
              className="premium-select sm:max-w-[220px]"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="premium-button sm:min-w-[120px]">
              Filter
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
