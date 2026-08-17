"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TelegramLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  botName?: string;
}

export default function TelegramLoginModal({
  isOpen,
  onClose,
  botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "sample_bot",
}: TelegramLoginModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global callback function for Telegram widget
    (window as any).onTelegramAuth = (user: any) => {
      localStorage.setItem("tg_user", JSON.stringify(user));
      window.dispatchEvent(new Event("tg_auth_changed"));
      onClose();
    };

    if (isOpen && containerRef.current) {
      // Clear previous script if any
      containerRef.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", botName);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)"); 
      script.setAttribute("data-request-access", "write");
      script.async = true;

      containerRef.current.appendChild(script);
    }
  }, [isOpen, botName, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-[#004b87] text-white">
          <h3 className="font-bold text-base">Telegram orqali kirish</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 flex flex-col items-center justify-center min-h-[160px] bg-white">
          <p className="text-sm text-gray-600 mb-6 text-center font-medium leading-relaxed">
            Platformaga kirish uchun quyidagi tugmani bosing va Telegram orqali tasdiqlang.
          </p>
          <div ref={containerRef} className="flex justify-center min-h-[40px]" />
        </div>
      </div>
    </div>
  );
}
