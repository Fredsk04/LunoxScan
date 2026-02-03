import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ProtectedWrapper from "./ProtectedWrapper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LunoxScan",
  description: "Read your scan instantly",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: { url: "/favicon/favicon.ico" },
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/favicon/site.webmanifest",
};

import Loader from "@/components/Loader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Loader />
        <ProtectedWrapper>
          {children}
        </ProtectedWrapper>
      </body>
    </html>
  );
}
