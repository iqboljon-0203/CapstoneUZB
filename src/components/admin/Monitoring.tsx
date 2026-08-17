"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Activity, MapPin, Clock } from "lucide-react";
import ReportModal from "./ReportModal";

const AdminMap = dynamic(() => import("@/components/AdminMap"), { ssr: false });

export default function Monitoring({ reports }: { reports: any[] }) {
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const recentReports = reports.slice(0, 15);

  const statusColors: Record<string, string> = {
    "Yangi": "bg-red-100 text-red-800",
    "Ko'rib chiqilmoqda": "bg-blue-100 text-blue-800",
    "Jarayonda": "bg-amber-100 text-amber-800",
    "Hal qilindi": "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0D1B2A] flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500 animate-pulse" />
            Jonli Kuzatuv (Live Monitoring)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Hududlar bo'ylab real vaqt rejimida tushayotgan arizalar xaritasi
          </p>
        </div>
        <div className="flex bg-gray-50 p-1 rounded-xl">
          {["all", "high", "low"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === f ? "bg-white text-[#0D4C73] shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {f === "all" ? "Barchasi" : f === "high" ? "Xavfli" : "Oddiy"}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100 min-h-[400px]">
          <AdminMap reports={reports} />
          
          {/* Status Overlay */}
          <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white">
            <p className="text-xs font-bold text-gray-500 uppercase">Faol hududlar</p>
            <p className="text-2xl font-extrabold text-[#0D1B2A] mt-1">{reports.length}</p>
          </div>
        </div>

        {/* Live Feed Sidebar */}
        <div className="w-full lg:w-80 xl:w-96 border-l border-gray-100 bg-gray-50 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h3 className="font-bold text-gray-800">Jonli oqim</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {recentReports.map((r, i) => (
              <div 
                key={r.id} 
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedReport(r)}
              >
                {i === 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-3 animate-ping" />
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="font-mono text-[#0D4C73] font-bold">{r.id.split('-')[0]}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(r.created_at).toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                  {r.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{r.address || "Manzil noma'lum"}</span>
                </div>
                <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[r.status] || "bg-gray-100 text-gray-800"}`}>
                  {r.status}
                </span>
              </div>
            ))}
            {reports.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                Arizalar yo'q
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
}
