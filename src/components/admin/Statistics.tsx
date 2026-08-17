"use client";

import { BarChart3, TrendingUp, TrendingDown, CalendarDays, PieChart } from "lucide-react";

export default function Statistics({ reports }: { reports: any[] }) {
  // Simple calculations for demo
  const total = reports.length || 1; // Avoid division by zero
  const resolved = reports.filter(r => r.status === "Hal qilindi").length;
  const inProgress = reports.filter(r => r.status === "Ko'rib chiqilmoqda" || r.status === "Jarayonda").length;
  const newReports = reports.filter(r => r.status === "Yangi").length;

  return (
    <div className="flex flex-col h-full gap-5">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-extrabold text-[#0D1B2A] mb-1">Umumiy Statistika</h2>
        <p className="text-sm text-gray-500 mb-6">Joriy oydagi ko'rsatkichlar tahlili</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-bold text-emerald-800 uppercase">Muvaffaqiyat</p>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{Math.round((resolved / total) * 100)}%</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">O'tgan oyga nisbatan +5%</p>
          </div>
          
          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-bold text-blue-800 uppercase">O'rtacha vaqt</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-blue-700">4.2 kun</p>
            <p className="text-xs text-blue-600 font-medium mt-1">Belgilangan me'yor: 7 kun</p>
          </div>
          
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-bold text-amber-800 uppercase">Yangi arizalar</p>
              <TrendingDown className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-extrabold text-amber-700">{newReports}</p>
            <p className="text-xs text-amber-600 font-medium mt-1">Tezkor e'tibor talab etiladi</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#0D1B2A] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0D4C73]" />
              Oylik tushum dinamikasi
            </h3>
            <button className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Joriy yil
            </button>
          </div>
          
          {/* Dummy Bar Chart using pure CSS/HTML */}
          <div className="flex-1 flex items-end justify-between gap-2 pt-10 pb-6 px-4">
            {[45, 60, 35, 80, 55, 90, 70, 65, Math.max(10, reports.length * 10), 0, 0, 0].map((h, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div 
                  className="w-full bg-blue-100 rounded-t-sm group-hover:bg-[#0D4C73] transition-colors relative" 
                  style={{ height: `${h}%`, minHeight: h > 0 ? '4px' : '0' }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-medium">
                  {['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-[#0D1B2A] flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-[#0D4C73]" />
            Holatlar taqsimoti
          </h3>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4 max-w-sm mx-auto w-full">
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Yangi ({newReports})</span>
                  <span className="text-gray-500">{Math.round((newReports/total)*100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(newReports/total)*100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Jarayonda ({inProgress})</span>
                  <span className="text-gray-500">{Math.round((inProgress/total)*100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(inProgress/total)*100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Hal qilindi ({resolved})</span>
                  <span className="text-gray-500">{Math.round((resolved/total)*100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(resolved/total)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple clock component inside the file since it's missing from lucide import
function Clock(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}
