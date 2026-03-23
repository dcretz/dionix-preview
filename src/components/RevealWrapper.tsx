"use client";

import { useReveal } from "@/lib/useReveal";

export default function RevealWrapper({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}
