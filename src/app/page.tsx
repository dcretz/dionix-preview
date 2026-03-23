"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import { Process, Why } from "@/components/ProcessAndWhy";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useReveal } from "@/lib/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Portfolio />
        <Pricing />
        <Process />
        <Why />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
