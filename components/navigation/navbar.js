"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useAuth, useCart } from "@/components/providers";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/profile", label: "Profile" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const { user, setUser } = useAuth();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(5,5,5,0.92)] backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="TregoIndia Clothing logo" width={38} height={38} priority />
          <div className="leading-tight">
            <div className="text-sm font-semibold uppercase tracking-[0.18em]">TregoIndia</div>
            <div className="text-xs text-[var(--muted)]">Clothing</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "font-semibold" : "text-[var(--muted)]"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="button-secondary relative !min-h-[42px] !px-4">
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--text)] px-1 text-xs text-white">
                {count}
              </span>
            ) : null}
          </Link>
          {user ? (
            <button type="button" onClick={logout} className="button-secondary !min-h-[42px] !px-4">
              <User size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link href="/profile" className="button-secondary !min-h-[42px] !px-4">
              <User size={18} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
