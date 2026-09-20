"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname?.startsWith("/admin") || pathname?.startsWith("/worker");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <div className="flex-1">{children}</div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
