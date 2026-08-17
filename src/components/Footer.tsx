"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { t } = useLang();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <footer className="bg-[#003366] text-blue-200 mt-auto border-t border-[#002244]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Capstone Project Uzbekistan Logo"
              width={32}
              height={32}
              className="rounded-sm object-cover border border-[#004b87]"
            />
            <span className="text-white font-bold text-sm tracking-wide">{t.brand}</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-center sm:text-left">{t.footer.copyright}</p>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs">
            {t.footer.links.map((link) => (
              <Link
                key={link}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
