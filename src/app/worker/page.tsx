"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, MapPin, Calendar, Tag, AlertCircle, Image as ImageIcon, 
  CheckCircle, Clock, Loader2, X, Activity, LayoutDashboard
} from "lucide-react";
import dynamic from "next/dynamic";

const ReportModalMap = dynamic(() => import("@/components/admin/ReportModalMap"), { ssr: false });

const DISTRICTS = [
  "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulug'bek", "Olmazor", 
  "Sergeli", "Shayxontohur", "Uchtepa", "Yakkasaroy", "Yangi hayot", 
  "Yashnobod", "Yunusobod"
];

function WorkerReportModal({ report, onClose }: { report: any, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(report?.status || "Yangi");
  const [acceptedByGroup, setAcceptedByGroup] = useState(report?.accepted_by_group || false);

  if (!report) return null;

  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus);
    setLoading(true);
    const { error } = await supabase.from('reports').update({ status: newStatus }).eq('id', report.id);
    setLoading(false);
    if (!error) {
      window.location.reload();
    } else {
      alert("Xatolik yuz berdi");
    }
  };

  const acceptReport = async () => {
    setLoading(true);
    const { error } = await supabase.from('reports').update({ accepted_by_group: true }).eq('id', report.id);
    setLoading(false);
    if (!error) {
      window.location.reload();
    } else {
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-extrabold text-[#0D1B2A]">{report.title}</h2>
            <p className="text-sm font-mono text-gray-500 mt-1">ID: {report.id}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors border border-gray-200 text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
              <Tag className="w-4 h-4" />
              {report.category || "Boshqa"}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold border border-gray-200">
              <Calendar className="w-4 h-4" />
              {new Date(report.created_at).toLocaleString("uz-UZ")}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-semibold border border-amber-100">
              <AlertCircle className="w-4 h-4" />
              {status}
            </span>
            
            {report.assigned_at && !acceptedByGroup && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                <Clock className="w-4 h-4" />
                Yuborildi: {new Date(report.assigned_at).toLocaleString("uz-UZ")}
              </span>
            )}
            {acceptedByGroup && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-semibold border border-green-100">
                <CheckCircle className="w-4 h-4" />
                Siz qabul qildingiz
              </span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Murojaat mazmuni</h3>
            <p className="text-gray-800 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line border border-gray-100">
              {report.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Manzil
            </h3>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-xl text-sm border border-gray-100 font-medium mb-3">
              {report.address || `${report.lat}, ${report.lng}`}
            </p>
            {report.lat && report.lng && (
              <div className="h-48 rounded-xl overflow-hidden border border-gray-200 relative">
                <ReportModalMap lat={report.lat} lng={report.lng} id={report.id} />
              </div>
            )}
          </div>

          {report.image_url && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Ilova qilingan rasm
              </h3>
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex justify-center">
                <img src={report.image_url} alt="Ariza rasmi" className="max-h-64 object-contain" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-end gap-3">
          {!acceptedByGroup && (
            <button 
              onClick={acceptReport}
              disabled={loading}
              className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors text-sm disabled:opacity-50 mr-auto"
            >
              Qabul qilib olish
            </button>
          )}

          <button 
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
          >
            Yopish
          </button>
          
          <div className="relative">
            <select
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={loading || !acceptedByGroup}
              className="appearance-none pl-5 pr-10 py-2.5 bg-[#0D4C73] text-white font-medium rounded-xl hover:bg-[#0a3d5c] transition-colors text-sm outline-none cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              <option value="Yangi">Yangi</option>
              <option value="Ko'rib chiqilmoqda">Ko'rib chiqilmoqda</option>
              <option value="Jarayonda">Jarayonda</option>
              <option value="Hal qilindi">Hal qilindi</option>
            </select>
            {loading ? (
              <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-white animate-spin pointer-events-none" />
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white text-xs">▼</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkerDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("worker_district");
    if (saved) {
      setSelectedDistrict(saved);
    }
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchReports(selectedDistrict);
    }
  }, [selectedDistrict]);

  const fetchReports = async (district: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("assigned_district", district)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setReports(data);
    }
    setLoading(false);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    localStorage.setItem("worker_district", district);
  };

  const handleLogout = () => {
    setSelectedDistrict(null);
    localStorage.removeItem("worker_district");
  };

  const statusColors: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-emerald-100 text-emerald-800",
  };

  if (!selectedDistrict) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
        <div className="bg-white border-t-4 border-[#0D4C73] border border-gray-300 w-full max-w-2xl p-8 sm:p-10 shadow-md relative overflow-hidden">
          <div className="flex justify-center mb-6 relative z-10">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-[#0D4C73]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Ishchi Guruh Paneli</h1>
          <p className="text-center text-gray-500 mb-8">Siz qaysi tuman mas'ulisiz? Tumaningizni tanlang.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DISTRICTS.map((d) => (
              <button
                key={d}
                onClick={() => handleDistrictSelect(d)}
                className="py-3 px-2 bg-gray-50 hover:bg-[#0D4C73] hover:text-white text-gray-700 font-semibold border border-gray-200 rounded-lg transition-colors text-sm text-center"
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f0f4f8] overflow-hidden font-sans">
      <aside className="hidden lg:flex flex-col w-64 bg-[#0D1B2A] flex-shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-white font-extrabold text-lg leading-none">Tizim nazorati</p>
          <p className="text-gray-400 text-xs mt-0.5">Ishchi guruh moduli</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-[#0D4C73] text-white">
            <LayoutDashboard className="w-4 h-4" />
            Mening arizalarim
          </div>
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm uppercase">
              {selectedDistrict[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold leading-none truncate">
                {selectedDistrict}
              </p>
              <button onClick={handleLogout} className="text-gray-400 text-xs mt-1 hover:text-white transition-colors">
                Tuman o'zgartirish
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{selectedDistrict} tumaniga kelib tushgan arizalar</h1>
            <p className="text-sm text-gray-500">Bu yerda sizga admin tomonidan yo'naltirilgan ishlarni ko'rasiz.</p>
          </div>
          <button className="lg:hidden text-sm font-semibold text-[#004b87]" onClick={handleLogout}>Chiqish</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-l-blue-500">
              <p className="text-xs font-bold text-gray-500 uppercase">Jami arizalar</p>
              <p className="text-3xl font-extrabold text-gray-900">{reports.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-l-orange-500">
              <p className="text-xs font-bold text-gray-500 uppercase">Qabul qilinmaganlar</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {reports.filter(r => !r.accepted_by_group).length}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-xs font-bold text-gray-500 uppercase">Hal qilinganlar</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {reports.filter(r => r.status === "Hal qilindi").length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0D1B2A]">
                    <th className="text-left text-xs font-semibold text-gray-300 px-4 py-3">ID / Vaqt</th>
                    <th className="text-left text-xs font-semibold text-gray-300 px-4 py-3">Holati</th>
                    <th className="text-left text-xs font-semibold text-gray-300 px-4 py-3">Manzil / Mazmun</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">Yuklanmoqda...</td>
                    </tr>
                  ) : reports.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        Hozircha arizalar yo'q.
                      </td>
                    </tr>
                  ) : (
                    reports.map((report) => {
                      let statusColor = "blue";
                      if (report.status === "Hal qilindi") statusColor = "green";
                      if (report.status === "Yangi") statusColor = "amber";

                      return (
                        <tr
                          key={report.id}
                          className={`hover:bg-gray-50 transition-colors cursor-pointer ${!report.accepted_by_group ? 'bg-red-50/30' : ''}`}
                          onClick={() => setSelectedReport(report)}
                        >
                          <td className="px-4 py-4">
                            <p className="text-sm font-bold text-[#0D4C73] truncate max-w-[120px]">{report.id}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(report.created_at).toLocaleDateString("uz-UZ")}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1.5 items-start">
                              {!report.accepted_by_group ? (
                                <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                  Qabul qilinmagan!
                                </span>
                              ) : (
                                <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" /> Qabul qilingan
                                </span>
                              )}
                              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${statusColors[statusColor]}`}>
                                {report.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{report.address}</p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{report.description}</p>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      <WorkerReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
}
