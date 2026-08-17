"use client";

import { useState } from "react";
import { Search, Filter, Download, MoreHorizontal, CheckCircle, Clock } from "lucide-react";
import ReportModal from "./ReportModal";

export default function Archive({ reports }: { reports: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Barchasi");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const statusColors: Record<string, string> = {
    "Yangi": "bg-red-100 text-red-800",
    "Ko'rib chiqilmoqda": "bg-blue-100 text-blue-800",
    "Jarayonda": "bg-amber-100 text-amber-800",
    "Hal qilindi": "bg-emerald-100 text-emerald-800",
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.address && r.address.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "Barchasi" || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-[#0D1B2A] mb-1">Murojaatlar Arxivi</h2>
        <p className="text-sm text-gray-500">Tizimga kelib tushgan barcha arizalar tarixi va hisobotlar.</p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 flex gap-3">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ID, sarlavha yoki manzil orqali qidirish..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all cursor-pointer"
            >
              <option value="Barchasi">Barcha holatlar</option>
              <option value="Yangi">Yangi</option>
              <option value="Ko'rib chiqilmoqda">Ko'rib chiqilmoqda</option>
              <option value="Jarayonda">Jarayonda</option>
              <option value="Hal qilindi">Hal qilindi</option>
            </select>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Excel yuklab olish
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 sticky top-0 z-10">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">ID / Sana</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Murojaat mazmuni</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Manzil</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Holat</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredReports.map((report) => (
              <tr 
                key={report.id} 
                className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-bold text-[#0D4C73]">{report.id.substring(0, 8)}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(report.created_at).toLocaleDateString("uz-UZ")}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{report.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1 max-w-sm">{report.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{report.address || "Kiritilmagan"}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[report.status] || "bg-gray-100 text-gray-800"}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-2 text-gray-400 hover:text-[#0D4C73] transition-colors rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Hech narsa topilmadi</p>
                  <p className="text-sm text-gray-400 mt-1">Boshqa so'z bilan qidirib ko'ring yoki filtrlarni o'zgartiring</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination dummy */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <p>Jami <b>{filteredReports.length}</b> ta murojaat ko'rsatilmoqda</p>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors" disabled>Oldingi</button>
          <button className="px-3 py-1 bg-[#0D4C73] text-white font-medium rounded-md">1</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">2</button>
          <button className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">Keyingi</button>
        </div>
      </div>
      
      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
}
