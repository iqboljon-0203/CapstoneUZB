"use client";
import { useEffect, useRef } from "react";

export default function ReportModalMap({ lat, lng, id }: { lat: number, lng: number, id: string }) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      // Fix icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const containerId = `report-map-${id}`;
      const container = document.getElementById(containerId);
      if (!container || (container as any)._leaflet_id) return;

      const map = L.map(containerId, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Add a marker for the exact report location
      L.marker([lat, lng]).addTo(map).bindPopup("Ariza joylashuvi").openPopup();

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, id]);

  return <div id={`report-map-${id}`} className="w-full h-full z-10 rounded-xl" />;
}
