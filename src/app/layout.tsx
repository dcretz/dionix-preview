import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import Cursor from "@/components/Cursor";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dionix Softworks — Aplicații Web & Software Custom",
  description:
    "Aplicații web custom, platforme SaaS și automatizări AI pentru antreprenori și firme care vor să crească.",
  keywords: ["web development", "aplicatii web", "SaaS", "AI", "Romania", "software custom"],
  openGraph: {
    title: "Dionix Softworks",
    description: "Software care lucrează.",
    url: "https://dionixsoftworks.ro",
    siteName: "Dionix Softworks",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${spaceMono.variable} ${syne.variable}`}>
      <body className="font-sans antialiased">
        <Cursor />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
