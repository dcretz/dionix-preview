"use client";

import Link from "next/link";

const featured = [
  {
    num: "01",
    badge: "Samsung TV App",
    badgeColor: "rgba(0,229,255,0.9)",
    badgeBorder: "rgba(0,229,255,0.3)",
    icon: "📺",
    title: "AI Media Player",
    desc: "Aplicație media player pentru Samsung Smart TV cu Live TV, Movies, Series și sistem de playlist. Publicată în Samsung TV Plus Store.",
    tags: ["Tizen", "Angular", "Samsung API", "SCSS"],
    stats: [
      { num: "TV+", label: "Store" },
      { num: "Live+VOD", label: "Streaming" },
    ],
  },
  {
    num: "02",
    badge: "Trading Bot",
    badgeColor: "rgba(74,222,128,0.9)",
    badgeBorder: "rgba(74,222,128,0.3)",
    icon: "⚡",
    title: "Automated Trades",
    desc: "Bot de trading automat care primește semnale prin Telegram, execută ordine pe Bybit și MetaTrader și gestionează automat TP/SL.",
    tags: ["Python", "Telegram API", "Bybit API", "MetaTrader"],
    stats: [
      { num: "24/7", label: "Automatizat" },
      { num: "Multi-EX", label: "Bybit + MT5" },
    ],
  },
];

const small = [
  {
    num: "03",
    badge: "SaaS",
    badgeColor: "rgba(123,97,255,0.9)",
    badgeBorder: "rgba(123,97,255,0.3)",
    icon: "🎬",
    title: "AIMediaPlayer.pro",
    desc: "Platformă SaaS proprie pentru streaming IPTV cu sistem de licențiere, trial 7 zile, plăți Stripe și rețea de reselleri.",
    tags: ["Django", "Stripe", "SQLite"],
    href: "https://aimediaplayer.pro",
  },
  {
    num: "04",
    badge: "Client",
    badgeColor: "rgba(201,168,76,0.9)",
    badgeBorder: "rgba(201,168,76,0.3)",
    icon: "🏠",
    title: "Little Art Design",
    desc: "Site portofoliu pentru cabinet de arhitectură și design interior cu galerie filtrabilă pe categorii.",
    tags: ["PHP", "SCSS", "Node.js"],
    href: "https://littleartdesign.ro",
  },
  {
    num: "05",
    badge: "E-commerce",
    badgeColor: "rgba(74,222,128,0.8)",
    badgeBorder: "rgba(74,222,128,0.3)",
    icon: "🌐",
    title: "BuyVignettes.com",
    desc: "Platformă e-commerce internațională pentru achiziția de roviniete online cu detecție automată a limbii.",
    tags: ["E-commerce", "Multilingv", "Plăți online"],
    href: "https://buyvignettes.com/ro",
  },
];

export default function Portfolio() {
  return (
    <section
      className="py-[120px] px-12 relative z-10 bg-surface border-t border-border"
      id="portofoliu"
    >
      <div className="max-w-[1200px] mx-auto mb-20 reveal">
        <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
          <span className="w-6 h-px bg-accent" />
          Portofoliu
        </div>
        <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] mb-4 text-[clamp(36px,5vw,56px)]">
          Proiecte
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_var(--border)]">
            Reale.
          </span>
        </h2>
        <p className="text-base leading-[1.7] max-w-[520px] text-text-mid">
          De la aplicații Samsung TV la platforme SaaS și boturi de trading — fiecare proiect a rezolvat o problemă reală.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Big row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 reveal mb-px bg-border border border-border"
        >
          {featured.map((p) => (
            <div
              key={p.num}
              className="card-line-hover relative p-12 transition-colors duration-300 hover:bg-surface2 bg-bg"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs tracking-[0.15em] text-text-muted">
                  {p.num}
                </span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1"
                  style={{ color: p.badgeColor, border: `1px solid ${p.badgeBorder}` }}
                >
                  {p.badge}
                </span>
              </div>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] mb-3">{p.title}</h3>
              <p className="text-sm leading-[1.7] mb-7 text-text-mid">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-[0.08em] uppercase px-2.5 py-1 text-text-muted border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-8 pt-6 border-t border-border">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-mono text-xl font-bold">
                      {s.num.includes("+") || s.num.includes("/") ? (
                        <>
                          {s.num.split(/([+/])/)[0]}
                          <span className="text-accent">
                            {s.num.includes("+") ? "+" : s.num.includes("/") ? "/7" : ""}
                          </span>
                        </>
                      ) : (
                        s.num
                      )}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase mt-1 text-text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Small row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 reveal border border-t-0 border-border bg-border"
        >
          {small.map((p) => (
            <div
              key={p.num}
              className="card-line-hover relative p-10 transition-colors duration-300 hover:bg-surface2 bg-bg"
            >
              <div className="flex justify-between items-start mb-5">
                <span className="font-mono text-xs tracking-[0.15em] text-text-muted">
                  {p.num}
                </span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1"
                  style={{ color: p.badgeColor, border: `1px solid ${p.badgeBorder}` }}
                >
                  {p.badge}
                </span>
              </div>
              <div className="text-2xl mb-3">{p.icon}</div>
              <h3 className="text-lg font-extrabold tracking-[-0.02em] mb-2.5">{p.title}</h3>
              <p className="text-sm leading-[1.7] mb-5 text-text-mid">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-[0.06em] uppercase px-2 py-1 text-text-muted border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:tracking-[0.15em] text-accent"
              >
                Live →
              </a>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex justify-between items-center gap-8 px-10 py-7 reveal sm:flex-row flex-col sm:items-center items-start border border-t-0 border-border bg-surface2">
          <p className="font-mono text-xs leading-relaxed text-text-mid">
            Fiecare proiect livrat cu cod în proprietatea clientului și documentație completă.
          </p>
          <Link
            href="#contact"
            className="font-mono text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200 whitespace-nowrap flex-shrink-0 text-accent border border-accent hover:bg-accent hover:text-bg"
          >
            Începe proiectul tău →
          </Link>
        </div>
      </div>
    </section>
  );
}
