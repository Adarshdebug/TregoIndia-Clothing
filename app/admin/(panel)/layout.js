import Link from "next/link";
import { LayoutGrid, Package, ShoppingCart } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart }
];

export default function AdminPanelLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#16110d] text-[#f7f4ef]">
      <div className="mx-auto grid min-h-screen max-w-[1400px] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <Link href="/admin/dashboard" className="mb-8 block">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e4c28c]">
              TregoIndia
            </div>
            <div className="mt-1 text-lg">Admin</div>
          </Link>
          <nav className="space-y-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-[46px] items-center gap-3 rounded-lg border border-white/10 px-4 text-sm text-white/84"
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
