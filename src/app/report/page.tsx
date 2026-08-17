"use client";
import { useState, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import {
  FileText,
  MapPin,
  Camera,
  AlertTriangle,
  Navigation,
  CheckCircle,
  ArrowLeft,
  Landmark,
  Loader2,
  Search,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Lazy-load the map only on client to avoid SSR issues
import dynamic from "next/dynamic";
const ReportMap = dynamic(() => import("@/components/ReportMap"), { ssr: false });

export default function ReportPage() {
  const { t } = useLang();
  const r = t.report;

  // Form state
  const [incidentType, setIncidentType] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reportId] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [lat, setLat] = useState(41.2995);
  const [lng, setLng] = useState(69.2401);

  const handleSearch = async () => {
    if (!address) return;
    setSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setLat(parseFloat(data[0].lat));
        setLng(parseFloat(data[0].lon));
      } else {
        alert("Manzil topilmadi");
      }
    } catch (e) {
      console.error(e);
    }
    setSearching(false);
  };

  const handleFileChange = (newFiles: FileList | null) => {
    if (newFiles) setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Get user from localStorage
    const tgUserStr = localStorage.getItem("tg_user");
    let telegram_user_id = "anonymous";
    if (tgUserStr && !anonymous) {
      try {
        telegram_user_id = JSON.parse(tgUserStr).id.toString();
      } catch (e) {}
    }

    let image_url = null;

    if (files && files.length > 0) {
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("reports")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        alert("Rasm yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki rasmsiz yuboring.");
        setSubmitting(false);
        return;
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("reports")
          .getPublicUrl(filePath);
        image_url = publicUrlData.publicUrl;
      }
    }

    const { data, error } = await supabase.from("reports").insert([
      {
        telegram_user_id,
        title: incidentType || "Umumiy murojaat",
        description,
        address,
        category: incidentType || "Boshqa",
        lat,
        lng,
        image_url,
        status: "Yangi",
      },
    ]);

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Xatolik: " + error.message);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
        <div className="bg-white border-t-4 border-[#004b87] border border-gray-300 p-8 sm:p-12 max-w-lg w-full text-center shadow-md">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">{r.successTitle}</h1>
          <p className="text-gray-700 mb-6 text-sm leading-relaxed">
            {r.successDesc}
            <span className="font-bold text-[#004b87] bg-blue-50 px-2 py-0.5 ml-1 border border-blue-100">{reportId}</span>
            {r.successDesc2}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#004b87] text-white font-bold rounded-md hover:bg-[#003366] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {r.backBtn}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] pb-12">
      {/* Hero */}
      <section className="bg-white border-b border-gray-300 py-10 sm:py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-4 shadow-sm">
          <AlertTriangle className="w-4 h-4" />
          {r.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight mb-4">
          {r.heroTitle}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto font-medium">{r.heroSubtitle}</p>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <form onSubmit={handleSubmit}>
          {/* Incident Details */}
          <div className="bg-white border-l-4 border-l-[#004b87] border border-gray-300 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
              <FileText className="w-5 h-5 text-[#004b87]" />
              {r.sectionIncident}
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {r.incidentTypeLabel} <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#004b87] focus:ring-4 focus:ring-[#ffbf47]/50 transition-all appearance-none"
                >
                  <option value="">{r.incidentTypePlaceholder}</option>
                  {r.incidentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {r.incidentDateLabel}
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#004b87] focus:ring-4 focus:ring-[#ffbf47]/50 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {r.descriptionLabel} <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={r.descriptionPlaceholder}
                className="w-full border-2 border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#004b87] focus:ring-4 focus:ring-[#ffbf47]/50 transition-all resize-y"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white border-l-4 border-l-[#004b87] border border-gray-300 p-6 sm:p-8 shadow-sm space-y-5 mt-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
              <MapPin className="w-5 h-5 text-[#004b87]" />
              {r.sectionLocation}
            </h2>

            {/* Map */}
            <div className="overflow-hidden border-2 border-gray-300 h-64 bg-gray-100 rounded-sm">
              <ReportMap lat={lat} lng={lng} onChange={(l, lg) => { setLat(l); setLng(lg); }} />
            </div>

            {/* Address */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSearch(); } }}
                  placeholder={r.addressPlaceholder}
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#004b87] focus:ring-4 focus:ring-[#ffbf47]/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={searching}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#004b87] text-white rounded-sm hover:bg-[#003366] transition-colors"
                >
                  {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setLat(pos.coords.latitude);
                      setLng(pos.coords.longitude);
                    });
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#004b87] text-white text-xs font-bold hover:bg-[#003366] transition-colors rounded-sm whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">{r.myLocationBtn}</span>
              </button>
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="bg-white border-l-4 border-l-[#004b87] border border-gray-300 p-6 sm:p-8 shadow-sm space-y-5 mt-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
              <Camera className="w-5 h-5 text-[#004b87]" />
              {r.sectionEvidence}
            </h2>

            <div
              className={`border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100 ${
                dragging ? "border-[#004b87] bg-blue-50" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <div className="w-16 h-16 bg-white border-2 border-gray-300 flex items-center justify-center mx-auto mb-4 rounded-sm">
                <Camera className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{r.uploadText}</p>
              <p className="text-xs text-gray-600">{r.uploadSubtext}</p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-[#004b87]" />
                    <span className="font-medium truncate">{f.name}</span>
                    <span className="ml-auto text-gray-500 text-xs">
                      {(f.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anonymous toggle */}
          <div className="bg-white border border-gray-300 p-5 mt-6 shadow-sm">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 border-2 transition-colors flex items-center ${
                    anonymous ? "bg-[#004b87] border-[#004b87]" : "bg-gray-200 border-gray-400 group-hover:border-gray-500"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white shadow-sm transform transition-transform ${
                      anonymous ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{r.anonymousLabel}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{r.anonymousDesc}</p>
              </div>
            </label>
          </div>

          {/* Submit row */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-gray-300">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-gray-400 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-500 transition-colors focus:ring-4 focus:ring-[#ffbf47]/50"
            >
              {r.cancelBtn}
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#004b87] text-white text-sm font-bold hover:bg-[#003366] transition-colors shadow-sm focus:ring-4 focus:ring-[#ffbf47]/50"
            >
              <Navigation className="w-4 h-4" />
              {r.submitBtn}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
