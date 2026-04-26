"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search, ShoppingBag, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/shop", label: "Shop", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: User }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(242,194,123,0.12)] bg-[linear-gradient(180deg,rgba(16,16,16,0.94),rgba(8,8,8,0.98))] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs transition ${
                active ? "font-semibold text-[var(--accent)]" : "text-white/48"
              }`}
            >
              <Icon size={18} className={active ? "text-[var(--accent)]" : "text-white/48"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
