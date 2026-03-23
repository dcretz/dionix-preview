"use client";

import { useState } from "react";
import SubscriptionModal from "./SubscriptionModal";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className="relative z-10 overflow-hidden border-t border-[#1E2733] bg-[#0D1117] py-20 md:py-32 px-6 md:px-12 text-center"
        id="contact"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
            Gata să începi?
          </div>

          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-[#E8EDF2] sm:text-5xl md:text-6xl lg:text-7xl">
            Hai să
            <br className="hidden sm:block" />
            <span className="text-[#00E5FF]"> construim</span>
            <br className="hidden sm:block" />
            ceva real.
          </h2>

          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-[#8A9BAB] md:mb-12">
            Spune-ne despre proiectul tău. Îți răspundem în maximum 24 de ore
            cu o primă evaluare gratuită.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="/website-in-1-ora"
              className="w-full text-center font-mono text-sm font-bold uppercase tracking-widest px-9 py-4 bg-[#00E5FF] text-[#080C10] transition-all duration-200 hover:bg-transparent hover:text-[#00E5FF] hover:outline hover:outline-1 hover:outline-[#00E5FF] sm:w-auto"
            >
              Website in 1 ora
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full font-mono text-sm font-bold uppercase tracking-widest px-9 py-4 border border-[#00E5FF] bg-transparent text-[#00E5FF] transition-all duration-200 hover:bg-[#00E5FF] hover:text-[#080C10] sm:w-auto"
            >
              Te contactăm noi
            </button>
          </div>

          <div className="mt-8 font-mono text-sm text-[#5A6A7A]">
            sau scrie direct la{" "}
            <a
              href="mailto:contact@dionixsoftworks.ro"
              className="text-[#00E5FF] hover:underline"
            >
              contact@dionixsoftworks.ro
            </a>
          </div>
        </div>
      </section>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
