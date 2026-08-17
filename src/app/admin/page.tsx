"use client";
import { useState, useEffect } from "react";
import { useLang, Lang } from "@/context/LanguageContext";
import dynamic from "next/dynamic";
import {
  Search,
  Bell,
  LayoutDashboard,
  Activity,
  Archive as ArchiveIcon,
  BarChart3,
  Settings as SettingsIcon,
  ChevronDown,
  Globe,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import Monitoring from "@/components/admin/Monitoring";
import Archive from "@/components/admin/Archive";
import Statistics from "@/components/admin/Statistics";
import Settings from "@/components/admin/Settings";
import ReportModal from "@/components/admin/ReportModal";

const AdminMap = dynamic(() => import("@/components/AdminMap"), { ssr: false });

type MapPeriod = "day" | "week";

export default function AdminPage() {
  const { lang, setLang, t } = useLang();
  const a = t.admin;
  const [mapPeriod, setMapPeriod] = useState<MapPeriod>("day");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [langOpen, setLangOpen] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setAdminEmail(session.user.email || "Admin");
        fetchReports();
      }
    });
  }, [router]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setReports(data);
    }
    setLoading(false);
  };

  const languages: { code: Lang; label: string }[] = [
    { code: "uz", label: "O'zbek" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ];

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard className="w-4 h-4" />, label: a.nav.dashboard },
    { id: "monitoring", icon: <Activity className="w-4 h-4" />, label: a.nav.liveMonitoring },
    { id: "archive", icon: <ArchiveIcon className="w-4 h-4" />, label: a.nav.archive },
    { id: "statistics", icon: <BarChart3 className="w-4 h-4" />, label: a.nav.statistics },
    { id: "settings", icon: <SettingsIcon className="w-4 h-4" />, label: a.nav.settings },
  ];

  const statusColors: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-emerald-100 text-emerald-800",
  };

  const kpiCards = [
    {
      label: a.kpi.todayLabel,
      value: reports.length.toString(),
      sub: a.kpi.todayDelta,
      icon: <LayoutDashboard className="w-5 h-5 text-blue-600" />,
      iconBg: "bg-blue-50",
      subColor: "text-emerald-600",
      border: "border-l-4 border-l-blue-500",
    },
    {
      label: a.kpi.inProgressLabel,
      value: reports.filter(r => r.status === "Ko'rib chiqilmoqda" || r.status === "Jarayonda").length.toString(),
      sub: a.kpi.inProgressSub,
      icon: <Activity className="w-5 h-5 text-orange-600" />,
      iconBg: "bg-orange-50",
      subColor: "text-gray-500",
      border: "border-l-4 border-l-orange-500",
    },
    {
      label: a.kpi.resolvedLabel,
      value: reports.filter(r => r.status === "Hal qilindi").length.toString(),
      sub: a.kpi.resolvedDelta,
      icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      subColor: "text-emerald-600",
      border: "border-l-4 border-l-emerald-500",
    },
    {
      label: a.kpi.urgentLabel,
      value: reports.filter(r => r.status === "Yangi").length.toString(),
      sub: "Tezkor e'tibor talab etiladi",
      icon: <Bell className="w-5 h-5 text-red-600" />,
      iconBg: "bg-red-50",
      subColor: "text-red-600",
      border: "border-l-4 border-l-red-500",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden font-sans">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-56 xl:w-64 bg-[#0D1B2A] flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-white font-extrabold text-lg leading-none">{a.brand}</p>
          <p className="text-gray-400 text-xs mt-0.5">{a.brandSub}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeNav === item.id
                  ? "bg-[#0D4C73] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin profile */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0D4C73] rounded-full flex items-center justify-center text-white font-bold text-sm uppercase">
              {adminEmail ? adminEmail[0] : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold leading-none truncate" title={adminEmail}>
                {adminEmail || "Admin"}
              </p>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/admin/login");
                }}
                className="text-gray-400 text-xs mt-1 hover:text-white transition-colors"
              >
                Tizimdan chiqish
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={a.searchPlaceholder}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Org name */}
            <span className="hidden xl:block text-sm font-semibold text-gray-700">{a.orgName}</span>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {activeNav === "dashboard" ? (
            <>
              {/* Title */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0D1B2A]">
                  {a.dashboardTitle}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">{a.dashboardSubtitle}</p>
              </div>

              {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${card.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide leading-tight">
                    {card.label}
                  </p>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                    {card.icon}
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0D1B2A] mb-1">
                  {card.value}
                </p>
                <p className={`text-xs font-medium ${card.subColor}`}>{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Map + Recent Reports */}
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Map */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-bold text-[#0D1B2A] text-sm">{a.mapTitle}</h2>
                <div className="flex gap-1">
                  {(["day", "week"] as MapPeriod[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setMapPeriod(p)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                        mapPeriod === p
                          ? "bg-[#0D1B2A] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {p === "day" ? a.mapBtnDay : a.mapBtnWeek}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm z-0">
                <AdminMap reports={reports} />
                {/* Legend */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-gray-100 text-xs">
                  <p className="font-bold text-gray-700 mb-1.5">{a.mapLegendTitle}</p>
                  <div className="space-y-1">
                    {[
                      { color: "bg-red-500", label: a.mapLegendHigh },
                      { color: "bg-purple-500", label: a.mapLegendMid },
                      { color: "bg-emerald-500", label: a.mapLegendLow },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                        <span className="text-gray-600">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-[#0D1B2A] text-sm">{a.recentTitle}</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0D1B2A]">
                      <th className="text-left text-xs font-semibold text-gray-300 px-4 py-2.5">
                        {a.tableHeaders.id}
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 px-2 py-2.5">
                        {a.tableHeaders.location}
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-300 px-2 py-2.5">
                        {a.tableHeaders.status}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                          Yuklanmoqda...
                        </td>
                      </tr>
                    ) : reports.slice(0, 5).map((report) => {
                      let statusColor = "blue";
                      if (report.status === "Hal qilindi") statusColor = "green";
                      if (report.status === "Yangi") statusColor = "amber";

                      return (
                        <tr
                          key={report.id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedReport(report)}
                        >
                          <td className="px-4 py-3">
                            <p className="text-xs font-bold text-[#0D4C73] truncate max-w-[100px]">{report.id}</p>
                            <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                              {new Date(report.created_at).toLocaleDateString("uz-UZ", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          </td>
                          <td className="px-2 py-3">
                            <p className="text-xs text-gray-700 leading-snug whitespace-pre-line line-clamp-2">
                              {report.address || report.title}
                            </p>
                          </td>
                          <td className="px-2 py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                                statusColors[statusColor]
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-gray-100 text-center">
                <button className="text-sm text-[#0D4C73] font-semibold hover:text-[#0a3d5c] transition-colors">
                  {a.viewAll}
                </button>
              </div>
            </div>
          </div>
            </>
          ) : activeNav === "monitoring" ? (
            <Monitoring reports={reports} />
          ) : activeNav === "archive" ? (
            <Archive reports={reports} />
          ) : activeNav === "statistics" ? (
            <Statistics reports={reports} />
          ) : activeNav === "settings" ? (
            <Settings adminEmail={adminEmail} />
          ) : null}
        </main>
      </div>

      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
}
