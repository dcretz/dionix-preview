"use client";

import Link from "next/link";

const packages = [
  {
    num: "01",
    name: "Landing Page",
    desc: "O pagină completă, modernă și profesionistă — tot ce ai nevoie pentru a fi găsit și contactat online.",
    tags: ["Design custom", "Mobile-ready", "Formular contact", "Deploy inclus"],
    price: "199",
    featured: false,
  },
  {
    num: "02",
    name: "Site Complet",
    desc: "Până la 5 pagini, galerie de proiecte, testimoniale și SEO configurat. Cel mai ales pachet.",
    tags: ["5 pagini", "Galerie", "SEO", "Blog opțional"],
    price: "299",
    featured: true,
  },
  {
    num: "03",
    name: "Site Premium",
    desc: "Până la 10 pagini, animații, integrări API, SEO avansat. Pentru firme cu nevoi complexe.",
    tags: ["10 pagini", "Animații", "API", "SEO avansat"],
    price: "449",
    featured: false,
  },
];

const included = [
  { title: "Design personalizat", desc: "Niciun template generic" },
  { title: "Mobile 100%", desc: "Orice dispozitiv" },
  { title: "SSL + Deploy", desc: "Live din prima zi" },
  { title: "30 zile suport", desc: "Gratuit după lansare" },
  { title: "Google Analytics", desc: "Trafic și statistici" },
  { title: "Revizii nelimitate", desc: "Până ești mulțumit" },
  { title: "Viteză maximă", desc: "PageSpeed optimizat" },
  { title: "Cod al tău", desc: "Fără lock-in" },
];

export default function Pricing() {
  return (
    <section className="py-[120px] px-12 relative z-10" id="preturi">
      <div className="max-w-[1200px] mx-auto mb-20 reveal">
        <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
          <span className="w-6 h-px bg-accent" />
          Prețuri
        </div>
        <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] mb-5 text-[clamp(36px,5vw,56px)]">
          Transparent.
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_var(--border)]">
            Fără surprize.
          </span>
        </h2>
        <p className="text-base leading-[1.7] max-w-[580px] text-text-mid">
          Pachete fixe pentru site-uri de prezentare. Pentru aplicații custom, SaaS și proiecte
          complexe — prețul începe de la{" "}
          <strong className="text-accent">399€</strong>.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 reveal bg-border border border-border">
          {packages.map((p) => (
            <div
              key={p.num}
              className={`relative p-12 transition-colors duration-300 hover:bg-surface2 ${p.featured ? "border-l-2 border-r-2 border-accent" : ""}`}
              style={{ background: "var(--bg)" }}
            >
              {p.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 bg-accent text-bg whitespace-nowrap">
                  Recomandat
                </div>
              )}
              <div
                className={`font-mono text-xs tracking-[0.15em] uppercase mb-6 ${p.featured ? "text-accent mt-3" : "text-text-muted mt-3"}`}
              >
                {p.num}
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.01em] mb-3">{p.name}</h3>
              <p className="text-sm leading-[1.7] mb-8 text-text-mid">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-[0.08em] uppercase px-2.5 py-1"
                    style={{
                      color: p.featured ? "var(--accent)" : "var(--text-muted)",
                      border: `1px solid ${p.featured ? "rgba(0,229,255,0.3)" : "var(--border)"}`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                className="flex justify-between items-end pt-8"
                style={{ borderTop: `1px solid ${p.featured ? "rgba(0,229,255,0.2)" : "var(--border)"}` }}
              >
                <div>
                  <div className={`font-mono text-4xl font-bold ${p.featured ? "text-accent" : "text-text"}`}>
                    {p.price}
                    <span className="text-accent">€</span>
                  </div>
                  <div className="font-mono text-xs mt-1 tracking-[0.05em] text-text-muted">
                    plată unică
                  </div>
                </div>
                <Link
                  href="#contact"
                  className={`font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-all duration-200 ${p.featured ? "bg-accent text-bg" : "text-accent border border-accent"}`}
                >
                  Începe →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom banner */}
        <div className="flex justify-between items-center gap-8 px-10 py-7 reveal sm:flex-row flex-col sm:items-center items-start border border-t-0 border-border bg-bg">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2.5 text-accent">
              <span className="w-5 h-px bg-accent" />
              Proiecte custom
            </div>
            <h3 className="text-3xl font-extrabold tracking-[-0.02em] mb-3">
              Aplicații web, SaaS, AI?
              <br />
              <span className="text-accent">De la 399€.</span>
            </h3>
            <p className="text-sm leading-[1.7] max-w-[520px] text-text-mid">
              Prețuri în funcție de complexitate. Evaluare gratuită în 24 de ore.
            </p>
          </div>
          <Link
            href="#contact"
            className="font-mono text-sm font-bold tracking-widest uppercase px-9 py-4 transition-all duration-200 flex-shrink-0 whitespace-nowrap bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
          >
            Evaluare gratuită
          </Link>
        </div>

        {/* Included grid */}
        <div className="mt-16 reveal">
          <div className="font-mono text-xs tracking-[0.2em] uppercase mb-8 flex items-center gap-3 text-accent">
            <span className="w-6 h-px bg-accent" />
            La orice pachet, inclus fără excepție
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 bg-border border border-border">
            {included.map((item) => (
              <div key={item.title} className="p-6 bg-bg">
                <div className="text-lg mb-2 text-accent">✓</div>
                <div className="text-sm font-bold mb-1.5">{item.title}</div>
                <div className="text-xs leading-[1.6] text-text-mid">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
