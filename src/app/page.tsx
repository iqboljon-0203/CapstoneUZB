"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import {
  ArrowRight,
  FileText,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Landmark,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLang();
  const h = t.home;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fa] border-b border-gray-200 pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 shadow-sm text-[#004b87] text-xs font-bold mb-6">
                <Landmark className="w-4 h-4" />
                {h.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                {h.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                {h.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#004b87] text-white font-bold rounded-md hover:bg-[#003366] transition-colors shadow-sm"
                >
                  <Shield className="w-4 h-4" />
                  {h.ctaReport}
                </Link>
                <Link
                  href="/info"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#004b87] font-bold rounded-md border-2 border-[#004b87] hover:bg-blue-50 transition-colors"
                >
                  {h.ctaLearnMore}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: authoritative image */}
            <div className="w-full mt-8 lg:mt-0">
              <div className="relative rounded-lg overflow-hidden h-56 sm:h-72 lg:h-96 shadow-lg border border-gray-200">
                <Image
                  src="/hero-children.jpg"
                  alt="Government Portal"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="bg-white border-l-4 border-l-[#004b87] border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-extrabold text-gray-900">{h.stat1Value}</p>
                <FileText className="w-6 h-6 text-[#004b87]" />
              </div>
              <p className="font-bold text-[#004b87] text-sm mb-2">{h.stat1Label}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{h.stat1Desc}</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border-l-4 border-l-[#004b87] border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-extrabold text-gray-900">{h.stat2Value}</p>
                <MapPin className="w-6 h-6 text-[#004b87]" />
              </div>
              <p className="font-bold text-[#004b87] text-sm mb-2">{h.stat2Label}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{h.stat2Desc}</p>
            </div>

            {/* Stat 3 — accent dark */}
            <div className="bg-[#f8f9fa] border-l-4 border-l-[#10b981] border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-extrabold text-gray-900">{h.stat3Value}</p>
                <TrendingUp className="w-6 h-6 text-[#10b981]" />
              </div>
              <p className="font-bold text-[#10b981] text-sm mb-2">{h.stat3Label}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{h.stat3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Section ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                {h.featureTitle}
              </h2>
              <div className="w-16 h-1 bg-[#004b87] mb-6" />
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">{h.featureSubtitle}</p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 border border-gray-200 bg-[#f8f9fa]">
                  <Shield className="w-6 h-6 text-[#004b87] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{h.feature1Title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{h.feature1Desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 border border-gray-200 bg-[#f8f9fa]">
                  <Zap className="w-6 h-6 text-[#004b87] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{h.feature2Title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{h.feature2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: official image */}
            <div className="relative rounded-lg overflow-hidden h-full min-h-[350px] shadow-md border border-gray-200">
              <Image
                src="/feature.jpg"
                alt="Internal Affairs Ministry"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="font-bold text-xl mb-1">Ichki Ishlar Vazirligi</h3>
                <p className="font-medium text-blue-100 text-sm">O'zbekiston Respublikasi</p>
                <p className="text-xs text-blue-200/80 mt-2 border-t border-white/20 pt-2">
                  Rasmiy hamkorlik doirasida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#004b87] border-t border-[#003366]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            {h.ctaReport}
          </h2>
          <p className="text-blue-100 mb-8 text-sm sm:text-base">{h.heroSubtitle}</p>
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#004b87] font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm"
          >
            {h.ctaReport}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
