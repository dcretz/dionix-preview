"use client";

import Link from "next/link";

const services = [
  {
    num: "01",
    icon: "⚡",
    title: "Aplicații Web Custom",
    desc: "Construim de la zero aplicații web scalabile, adaptate exact proceselor tale de business. Fără template-uri, fără compromisuri.",
    tags: ["React / Next.js", "Node.js", "PostgreSQL"],
  },
  {
    num: "02",
    icon: "🚀",
    title: "Platforme SaaS",
    desc: "De la idee la produs lansat. Arhitectură multi-tenant, autentificare, billing, dashboard-uri — tot ce ai nevoie.",
    tags: ["Multi-tenant", "Stripe", "Auth"],
  },
  {
    num: "03",
    icon: "🤖",
    title: "Automatizări & AI",
    desc: "Agenți autonomi, procesare automată de date, workflow-uri inteligente care îți salvează ore zilnic.",
    tags: ["LLM Integration", "Agenți AI", "n8n"],
  },
  {
    num: "04",
    icon: "🔧",
    title: "Redesign & Modernizare",
    desc: "Aplicația ta funcționează dar arată sau performează prost? O reconstruim modern fără să pierzi datele.",
    tags: ["Migrare", "Performance", "UX/UI"],
  },
  {
    num: "05",
    icon: "🎯",
    title: "Consultanță Tehnică",
    desc: "Arhitectură clară, tech stack potrivit și un plan realist înainte să investești în development.",
    tags: ["Arhitectură", "Tech Audit", "Roadmap"],
  },
];

export default function Services() {
  return (
    <section className="py-[120px] px-12 relative z-10" id="servicii">
      <div className="max-w-[1200px] mx-auto mb-20 reveal">
        <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
          <span className="w-6 h-px bg-accent" />
          Ce construim
        </div>
        <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(36px,5vw,56px)]">
          Servicii
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_var(--border)]">
            & Soluții
          </span>
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 reveal bg-border border border-border">
        {services.map((s) => (
          <div
            key={s.num}
            className="card-line-hover relative transition-colors duration-300 hover:bg-surface2 p-12 bg-surface"
          >
            <div className="font-mono text-xs tracking-[0.15em] mb-8 text-text-muted">
              {s.num}
            </div>
            <span className="text-3xl mb-6 block">{s.icon}</span>
            <h3 className="text-xl font-bold mb-4">{s.title}</h3>
            <p className="text-sm leading-[1.7] mb-8 text-text-mid">
              {s.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-[0.08em] uppercase px-2.5 py-1 text-text-muted border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div className="p-12 flex flex-col justify-center items-center text-center bg-surface2">
          <div className="font-mono text-sm mb-6 text-text-muted">
            Ai un proiect specific?
          </div>
          <Link
            href="#contact"
            className="font-mono text-sm font-bold tracking-widest uppercase px-9 py-4 transition-all duration-200 bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
          >
            Discutăm →
          </Link>
        </div>
      </div>
    </section>
  );
}
