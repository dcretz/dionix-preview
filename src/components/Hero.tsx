"use client";

import Link from "next/link";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 pt-[120px] pb-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-[1200px] mx-auto w-full">

        {/* LEFT */}
        <div>
          <div className="font-mono text-xs tracking-[0.2em] uppercase mb-8 flex items-center gap-3 fade-up-1 text-accent">
            <span className="w-8 h-px bg-accent" />
            Dionix Softworks — Software Custom România
          </div>

          <h1 className="font-sans font-extrabold leading-[0.95] tracking-[-0.03em] mb-8 fade-up-2 text-[clamp(48px,6vw,80px)]">
            Construim
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(232,237,242,0.3)]">
              software
            </span>
            <br />
            <span className="text-accent">care lucrează.</span>
          </h1>

          <p className="text-lg leading-[1.7] mb-12 fade-up-3 text-text-mid">
            Aplicații web custom, platforme SaaS și automatizări AI pentru
            antreprenori și firme care vor să crească.
          </p>

          <div className="flex gap-5 items-center fade-up-4">
            <Link
              href="#contact"
              className="font-mono text-sm font-bold tracking-widest uppercase px-9 py-4 transition-all duration-200 bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
            >
              Începe un proiect
            </Link>
            <Link
              href="#servicii"
              className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-200 hover:text-white text-text-muted"
            >
              Vezi serviciile <span>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 fade-up-6 border-t border-border">
            {[
              { num: "5", suffix: "+", label: "Ani experiență" },
              { num: "Full", suffix: "-Stack", label: "Web & AI" },
              { num: "100", suffix: "%", label: "Custom build" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-mono text-xl font-bold text-text">
                  {s.num}
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase mt-1 text-text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Terminal */}
        <Terminal />
      </div>
    </section>
  );
}
