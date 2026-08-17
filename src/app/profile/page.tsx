"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogOut, FileText, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tgUser = localStorage.getItem("tg_user");
    if (tgUser) {
      const parsedUser = JSON.parse(tgUser);
      setUser(parsedUser);
      fetchReports(parsedUser.id);
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchReports = async (telegramId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("telegram_user_id", telegramId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reports:", error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("tg_user");
    window.dispatchEvent(new Event("tg_auth_changed"));
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.photo_url ? (
                <img src={user.photo_url} alt="Profile" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#004b87] text-white flex items-center justify-center text-2xl font-bold">
                  {user.first_name?.[0]}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.first_name} {user.last_name}</h1>
                <p className="text-sm text-gray-500">@{user.username || user.id}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Mening murojaatlarim</h2>
          <span className="px-3 py-1 bg-gray-100 text-[#004b87] text-sm font-bold rounded-full">
            Jami: {reports.length} ta
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004b87]"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hozircha murojaatlar yo'q</h3>
            <p className="text-gray-500">Siz hali tizim orqali hisobot yubormagansiz.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{report.title}</h3>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    report.status === 'Hal qilindi' ? 'bg-green-100 text-green-700' : 
                    report.status === "Ko'rib chiqilmoqda" ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {report.status === 'Hal qilindi' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {report.status || "Yangi"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.description}</p>
                <div className="text-xs text-gray-400 font-medium">
                  {new Date(report.created_at).toLocaleDateString("uz-UZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
