import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "O'zbekiston Respublikasi Hukumat Portali - Murojaatlar",
    template: "%s | Hukumat Portali"
  },
  description: "Bolalar mehnati va huquqbuzarliklarga qarshi kurash portali. Mamlakat kelajagini himoya qilish — har birimizning burchimiz. Huquqbuzarliklar haqida xabar bering.",
  keywords: ["O'zbekiston", "hukumat portali", "huquqbuzarlik", "bolalar mehnati", "ariza yuborish", "IIV", "murojaat"],
  authors: [{ name: "O'zbekiston Hukumat Portali" }],
  creator: "Davlat axborot tizimi",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://bolalar-mehnati-kuzatuvi.uz",
    title: "O'zbekiston Respublikasi Hukumat Portali - Murojaatlar",
    description: "Bolalar mehnati va huquqbuzarliklarga qarshi kurash portali. Adolatni qaror toptirishda o'z hissangizni qo'shing.",
    siteName: "Hukumat Portali",
    images: [
      {
        url: "https://bolalar-mehnati-kuzatuvi.uz/feature.jpg",
        width: 1200,
        height: 630,
        alt: "O'zbekiston Respublikasi Hukumat Portali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O'zbekiston Respublikasi Hukumat Portali",
    description: "Huquqbuzarliklar haqida ishonchli tarzda xabar bering.",
    images: ["https://bolalar-mehnati-kuzatuvi.uz/feature.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
