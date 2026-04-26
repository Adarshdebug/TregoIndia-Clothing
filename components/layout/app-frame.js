"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav";

export function AppFrame({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return children;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      {children}
      <MobileBottomNav />
    </div>
  );
}
