"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang, Lang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Shield,
  Eye,
} from "lucide-react";
import TelegramLoginModal from "./TelegramLoginModal";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = () => {
      const tgUser = localStorage.getItem("tg_user");
      if (tgUser) {
        setUser(JSON.parse(tgUser));
      } else {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener("tg_auth_changed", loadUser);
    return () => window.removeEventListener("tg_auth_changed", loadUser);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/report", label: t.nav.report },
    { href: "/info", label: t.nav.info },
  ];

  const languages: { code: Lang; label: string; flagUrl: string }[] = [
    { code: "uz", label: "O'zbek", flagUrl: "https://flagcdn.com/w20/uz.png" },
    { code: "ru", label: "Русский", flagUrl: "https://flagcdn.com/w20/ru.png" },
    { code: "en", label: "English", flagUrl: "https://flagcdn.com/w20/gb.png" },
  ];

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm flex flex-col">
      {/* Official Government Top Bar */}
      <div className="bg-[#004b87] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-medium flex justify-between items-center">
        <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity min-w-0">
          <Shield className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{t.header.govPortal}</span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <button className="hidden sm:flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <Eye className="w-3.5 h-3.5" />
            <span>{t.header.accessibility}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Capstone Project Uzbekistan Logo"
              width={40}
              height={40}
              className="rounded-md object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-[#004b87] text-lg sm:text-xl tracking-tight leading-none">
                {t.brand}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">
                {t.header.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 text-sm font-bold border-b-[3px] transition-all duration-200 ${
                    active
                      ? "text-[#004b87] border-[#004b87]"
                      : "text-gray-600 border-transparent hover:text-[#004b87] hover:border-[#004b87]/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-[#004b87] hover:bg-gray-100 rounded-md transition-all border border-gray-200"
                aria-label="Change language"
              >
                <span className="hidden sm:flex items-center gap-1.5 uppercase text-xs font-bold">
                  {languages.find((l) => l.code === lang) && (
                    <img 
                      src={languages.find((l) => l.code === lang)?.flagUrl} 
                      alt={lang} 
                      className="w-4 h-auto rounded-[2px]" 
                    />
                  )}
                  {lang}
                </span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        lang === l.code
                          ? "text-[#004b87] font-bold bg-blue-50 border-l-4 border-[#004b87]"
                          : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      <img src={l.flagUrl} alt={l.label} className="w-4 h-auto rounded-[2px]" />
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile / Login */}
            {user ? (
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-[#004b87] text-white rounded-md text-sm font-bold hover:bg-[#003366] transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                {user.first_name}
              </Link>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-[#004b87] text-white rounded-md text-sm font-bold hover:bg-[#003366] transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                {t.loginBtn}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#004b87] hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-bold border-l-4 transition-colors ${
                    active
                      ? "text-[#004b87] bg-blue-50 border-[#004b87]"
                      : "text-gray-700 hover:bg-gray-50 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="px-4 py-3 border-t border-gray-100 mt-2">
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-bold text-[#004b87] w-full text-left"
                >
                  <User className="w-4 h-4" />
                  {user.first_name}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-[#004b87] w-full text-left"
                >
                  <User className="w-4 h-4" />
                  {t.loginBtn}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <TelegramLoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </header>
  );
}
