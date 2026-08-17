"use client";
import { useEffect } from "react";

// Admin dashboard map for Tashkent with real incident markers
export default function AdminMap({ reports = [] }: { reports?: any[] }) {
  useEffect(() => {
    import("leaflet").then((L) => {
      // Fix icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const container = document.getElementById("admin-map");
      if (!container || (container as any)._leaflet_id) return;

      const map = L.map("admin-map", {
        center: [41.2995, 69.2401],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Real incident markers
      reports.forEach((inc) => {
        if (!inc.lat || !inc.lng) return;
        
        let color = "#3b82f6"; // blue
        if (inc.status === "Yangi") color = "#ef4444"; // red
        if (inc.status === "Ko'rib chiqilmoqda" || inc.status === "Jarayonda") color = "#f59e0b"; // amber
        if (inc.status === "Hal qilindi") color = "#10b981"; // green

        const icon = L.divIcon({
          html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
          className: "",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        L.marker([inc.lat, inc.lng], { icon })
          .addTo(map)
          .bindPopup(`<b>${inc.id?.substring(0,8) || 'Ariza'}</b><br/>${inc.status}`);
      });
    });

    // Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  return <div id="admin-map" className="w-full h-full" />;
}
