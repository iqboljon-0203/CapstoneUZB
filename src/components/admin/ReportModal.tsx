"use client";

import { X, MapPin, Calendar, Tag, AlertCircle, Image as ImageIcon, Loader2, Users, CheckCircle, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const ReportModalMap = dynamic(() => import("./ReportModalMap"), { ssr: false });

export default function ReportModal({ report, onClose }: { report: any, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(report?.status || "Yangi");
  const [assignedDistrict, setAssignedDistrict] = useState(report?.assigned_district || "");
  const [acceptedByGroup, setAcceptedByGroup] = useState(report?.accepted_by_group || false);
  const [assignedAt, setAssignedAt] = useState(report?.assigned_at || null);

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

  const updateDistrict = async (newDistrict: string) => {
    setAssignedDistrict(newDistrict);
    setLoading(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from('reports').update({ 
      assigned_district: newDistrict,
      assigned_at: now,
      accepted_by_group: false
    }).eq('id', report.id);
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
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-extrabold text-[#0D1B2A]">{report.title}</h2>
            <p className="text-sm font-mono text-gray-500 mt-1">ID: {report.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors border border-gray-200 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
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
            {assignedDistrict && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold border border-purple-100">
                <Users className="w-4 h-4" />
                {assignedDistrict} ishchi guruhi
              </span>
            )}
            {assignedDistrict && assignedAt && !acceptedByGroup && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                <Clock className="w-4 h-4" />
                Yuborildi: {new Date(assignedAt).toLocaleString("uz-UZ")}
              </span>
            )}
            {assignedDistrict && acceptedByGroup && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-semibold border border-green-100">
                <CheckCircle className="w-4 h-4" />
                Ishchi guruh qabul qildi
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

        {/* Footer / Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-end gap-3">
          {assignedDistrict && !acceptedByGroup && (
            <button 
              onClick={acceptReport}
              disabled={loading}
              className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors text-sm disabled:opacity-50 mr-auto"
            >
              Guruh nomidan qabul qilish
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
              value={assignedDistrict}
              onChange={(e) => updateDistrict(e.target.value)}
              disabled={loading}
              className="appearance-none pl-5 pr-10 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors text-sm outline-none cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              <option value="" disabled>Tuman guruhiga biriktirish</option>
              <option value="Bektemir">Bektemir</option>
              <option value="Chilonzor">Chilonzor</option>
              <option value="Mirobod">Mirobod</option>
              <option value="Mirzo Ulug'bek">Mirzo Ulug'bek</option>
              <option value="Olmazor">Olmazor</option>
              <option value="Sergeli">Sergeli</option>
              <option value="Shayxontohur">Shayxontohur</option>
              <option value="Uchtepa">Uchtepa</option>
              <option value="Yakkasaroy">Yakkasaroy</option>
              <option value="Yangi hayot">Yangi hayot</option>
              <option value="Yashnobod">Yashnobod</option>
              <option value="Yunusobod">Yunusobod</option>
            </select>
            {loading ? (
              <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-white animate-spin pointer-events-none" />
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white text-xs">▼</div>
            )}
          </div>
          
          <div className="relative">
            <select
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={loading}
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
