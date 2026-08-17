"use client";

import { User, Lock, BellRing, Save } from "lucide-react";
import { useState } from "react";

export default function Settings({ adminEmail }: { adminEmail: string }) {
  const [email, setEmail] = useState(adminEmail);
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      alert("Sozlamalar muvaffaqiyatli saqlandi!");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full max-w-4xl mx-auto overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#0D1B2A] mb-1">Tizim Sozlamalari</h2>
          <p className="text-sm text-gray-500">Profil va xavfsizlik sozlamalarini boshqarish</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Profile Section */}
          <div className="flex gap-8 items-start border-b border-gray-100 pb-8 flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> Profil
              </h3>
              <p className="text-xs text-gray-500">Tizimdagi shaxsiy ma'lumotlaringiz</p>
            </div>
            <div className="w-full sm:w-2/3 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#0D4C73] rounded-full flex items-center justify-center text-white font-bold text-2xl uppercase">
                  {adminEmail ? adminEmail[0] : "A"}
                </div>
                <button type="button" className="text-sm font-medium text-[#0D4C73] hover:underline">
                  Rasm yuklash
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ism familiya</label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Elektron pochta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="flex gap-8 items-start border-b border-gray-100 pb-8 flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" /> Xavfsizlik
              </h3>
              <p className="text-xs text-gray-500">Parolni o'zgartirish va himoya</p>
            </div>
            <div className="w-full sm:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joriy parol</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4C73]/30 focus:border-[#0D4C73] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex gap-8 items-start pb-4 flex-col sm:flex-row">
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                <BellRing className="w-4 h-4 text-gray-500" /> Xabarnomalar
              </h3>
              <p className="text-xs text-gray-500">Tizim bildirishnomalarini sozlash</p>
            </div>
            <div className="w-full sm:w-2/3 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#0D4C73] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">
                  Yangi arizalar haqida email orqali xabar berish
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="block bg-[#0D4C73] w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">
                  Xavf darajasi yuqori holatlarda Telegram xabari
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0D4C73] text-white font-bold rounded-xl hover:bg-[#0a3d5c] transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
