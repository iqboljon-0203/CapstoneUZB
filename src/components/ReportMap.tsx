"use client";
import { useEffect, useRef } from "react";

// Leaflet map for the report page centered on Tashkent
export default function ReportMap({ lat, lng, onChange }: { lat?: number, lng?: number, onChange?: (lat: number, lng: number) => void }) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const container = document.getElementById("report-map");
      if (!container) return;

      // Avoid re-init
      if ((container as any)._leaflet_id) return;

      const map = L.map("report-map", {
        center: [41.2995, 69.2401],
        zoom: 13,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Add a draggable marker
      const initialLat = lat || 41.2995;
      const initialLng = lng || 69.2401;
      const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);
      markerRef.current = marker;
      
      // Keep map centered if props change
      if (lat && lng) {
        map.setView([lat, lng], 15);
      }

      marker.on("dragend", (e: any) => {
        const pos = e.target.getLatLng();
        if (onChange) onChange(pos.lat, pos.lng);
      });

      // Click to move marker
      map.on("click", (e: any) => {
        marker.setLatLng(e.latlng);
        if (onChange) onChange(e.latlng.lat, e.latlng.lng);
      });
      // Initialize with default
      if (onChange) onChange(initialLat, initialLng);
    });

    // Load leaflet CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current && lat && lng) {
      mapRef.current.setView([lat, lng], 15);
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  return <div id="report-map" className="w-full h-full min-h-[224px]" />;
}
