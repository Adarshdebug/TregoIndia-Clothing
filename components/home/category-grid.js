import Link from "next/link";

const categories = [
  { label: "Men", href: "/products?category=Men" },
  { label: "Women", href: "/products?category=Women" },
  { label: "Streetwear", href: "/products?category=Streetwear" },
  { label: "Oversized", href: "/products?category=Oversized" }
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category, index) => (
        <Link
          key={category.label}
          href={category.href}
          className="touch-card group min-h-32 overflow-hidden p-5 transition hover:-translate-y-1"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="text-3xl font-semibold text-white/20">0{index + 1}</div>
            <div>
              <h3 className="text-xl font-semibold">{category.label}</h3>
              <p className="mt-2 text-sm text-white/50">Tap into the latest edits</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
