import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site-ul tău în 1 oră — Dionix Softworks",
  description: "Preview gratuit al site-ului tău în mai puțin de 1 oră. Plătești doar dacă îți place.",
};

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
