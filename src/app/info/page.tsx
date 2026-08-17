"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import {
  BookOpen,
  Globe,
  AlertTriangle,
  Download,
  FileText,
  ChevronDown,
  Users,
  Briefcase,
  BarChart3,
  Phone,
  Shield,
  CheckCircle,
} from "lucide-react";

type Tab = "law" | "parents" | "employers" | "stats";

export default function InfoPage() {
  const { t } = useLang();
  const info = t.info;
  const [activeTab, setActiveTab] = useState<Tab>("law");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "law", label: info.tabs.law, icon: <BookOpen className="w-4 h-4" /> },
    { id: "parents", label: info.tabs.parents, icon: <Users className="w-4 h-4" /> },
    { id: "employers", label: info.tabs.employers, icon: <Briefcase className="w-4 h-4" /> },
    { id: "stats", label: info.tabs.stats, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-300 py-10 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
            {info.pageTitle}
          </h1>
          <p className="text-gray-700 max-w-2xl text-sm sm:text-base leading-relaxed">
            {info.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Tab Bar */}
      <div className="border-b border-gray-300 sticky top-16 sm:top-[72px] z-30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-[3px] whitespace-nowrap transition-colors focus:ring-4 focus:ring-[#ffbf47]/50 ${
                  activeTab === tab.id
                    ? "border-[#004b87] text-[#004b87] bg-blue-50/50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── LAW TAB ── */}
        {activeTab === "law" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Law Card */}
              <div className="lg:col-span-2 border-l-4 border-l-[#004b87] border border-gray-300 rounded-sm p-6 sm:p-8 bg-white shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-[#004b87] text-xs font-bold rounded-sm border border-gray-200 mb-5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {info.mainLawBadge}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {info.mainLawTitle}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{info.mainLawDesc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                  <span className="text-xs font-medium text-gray-500">{info.mainLawDate}</span>
                  <button className="text-sm text-[#004b87] font-bold hover:underline focus:ring-2 focus:ring-[#ffbf47]">
                    {info.mainLawRead}
                  </button>
                </div>
              </div>

              {/* International Card */}
              <div className="bg-white border-t-4 border-t-blue-600 border border-gray-300 rounded-sm p-6 shadow-sm flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-sm border border-blue-100 mb-4 self-start">
                  <Globe className="w-3.5 h-3.5" />
                  {info.intlBadge}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">
                  {info.intlTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{info.intlDesc}</p>
                <button className="text-sm text-blue-700 font-bold hover:underline self-start">
                  {info.intlMore}
                </button>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Liability Card */}
              <div className="border-t-4 border-t-red-600 bg-white border border-gray-300 rounded-sm p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-sm border border-red-100 mb-4">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {info.liabilityBadge}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">
                  {info.liabilityTitle}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{info.liabilityDesc}</p>
                <button className="text-sm text-red-700 font-bold hover:underline">
                  {info.liabilityMore}
                </button>
              </div>

              {/* Resources Card */}
              <div className="bg-white border-t-4 border-t-emerald-600 border border-gray-300 rounded-sm p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  {info.resourcesTitle}
                </h3>
                <div className="space-y-3 pt-2">
                  {[
                    { name: info.resource1Name, meta: info.resource1Meta },
                    { name: info.resource2Name, meta: info.resource2Meta },
                  ].map((res) => (
                    <div
                      key={res.name}
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-sm hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer group focus-within:ring-4 focus-within:ring-[#ffbf47]/50"
                    >
                      <div className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{res.name}</p>
                        <p className="text-xs text-gray-600 font-medium">{res.meta}</p>
                      </div>
                      <Download className="w-4 h-4 text-[#004b87] group-hover:text-[#003366] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-sm border border-gray-300 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                {info.faqTitle}
              </h2>
              <div className="space-y-0 border border-gray-300 rounded-sm divide-y divide-gray-200">
                {info.faq.map((item, idx) => (
                  <div key={idx} className="bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#ffbf47]"
                    >
                      <span className="text-sm font-bold text-gray-900 pr-4">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#004b87]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-5 pt-1">
                        <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-l-[#004b87] pl-4">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PARENTS TAB ── */}
        {activeTab === "parents" && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-l-indigo-600 border border-gray-300 rounded-sm p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{info.parentsSafetyTitle}</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{info.parentsSafetyDesc}</p>
              
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4">{info.parentsSignsTitle}</h3>
                <ul className="space-y-3">
                  {[info.parentSign1, info.parentSign2, info.parentSign3, info.parentSign4].map(
                    (sign) => (
                      <li key={sign} className="flex items-start gap-3 text-sm text-gray-800">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{sign}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            
            <div className="bg-white border-l-4 border-l-red-600 border border-gray-300 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{info.parentsEmergencyTitle}</h2>
              </div>
              <p className="text-sm text-gray-700 mb-6 flex-1">{info.parentsEmergencyDesc}</p>
              
              <div className="space-y-3">
                {[info.parentsEmergencyLine1, info.parentsEmergencyLine2].map((line) => (
                  <div key={line} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-sm px-4 py-4 shadow-sm hover:border-gray-300 transition-colors">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-base font-extrabold text-gray-900 tracking-wide">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EMPLOYERS TAB ── */}
        {activeTab === "employers" && (
          <div className="bg-white border-t-4 border-t-[#004b87] border border-gray-300 rounded-sm p-6 sm:p-8 shadow-sm max-w-3xl">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
              <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#004b87]" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">{info.employersTitle}</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">{info.employersDesc}</p>
            
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-sm">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Majburiyatlar</h3>
              <ul className="space-y-4">
                {[
                  info.employersRule1,
                  info.employersRule2,
                  info.employersRule3,
                  info.employersRule4,
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#004b87] flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-800 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── STATS TAB ── */}
        {activeTab === "stats" && (
          <div className="bg-white border border-gray-300 rounded-sm p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-[#004b87]" />
              {info.statsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {info.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 border border-gray-200 rounded-sm p-6 text-center hover:bg-gray-100 transition-colors"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#004b87] mb-2">{stat.value}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
              <span>* Oxirgi 30 kunga oid ma'lumotlar</span>
              <button className="text-[#004b87] font-bold hover:underline">To'liq hisobotni yuklab olish</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
