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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[rgba(255,253,249,0.96)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-1 text-xs ${
                active ? "font-semibold text-[var(--text)]" : "text-[var(--muted)]"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
