"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const pages = ["Home", "Despre noi", "Servicii", "Contact", "Portofoliu", "Blog", "Testimoniale", "Preturi"];
const colors = [
  { id: "dark", name: "Dark & Modern", gradient: "bg-gradient-to-br from-[#080C10] via-[#1a1a2e] to-[#00e5ff]" },
  { id: "white", name: "Curat & Alb", gradient: "bg-gradient-to-br from-white via-gray-100 to-gray-600" },
  { id: "warm", name: "Cald & Natural", gradient: "bg-gradient-to-br from-[#f5f0e8] via-[#b5a06a] to-[#4a3728]" },
  { id: "blue", name: "Corporate Blue", gradient: "bg-gradient-to-br from-[#0f172a] via-[#1e40af] to-[#60a5fa]" },
  { id: "creative", name: "Creativ", gradient: "bg-gradient-to-br from-[#7c3aed] via-[#db2777] to-[#f97316]" },
  { id: "green", name: "Verde & Eco", gradient: "bg-gradient-to-br from-[#052e16] via-[#16a34a] to-[#86efac]" },
];
const styles = [
  { id: "minimal", name: "Minimalist", desc: "Curat, spatios, elegant", icon: "✦" },
  { id: "bold", name: "Bold", desc: "Puternic, cu animatii", icon: "⚡" },
  { id: "warm", name: "Cald & Local", desc: "Prietenos, accesibil", icon: "☀️" },
  { id: "pro", name: "Profesional", desc: "Structurat, B2B", icon: "⚙" },
];

interface FormData {
  name: string; industry: string; desc: string; site: string;
  pages: string[]; extra: string; color: string; style: string;
  email: string; phone: string; pkg: string;
}

const stepLabels = ["Firma", "Pagini", "Design", "Contact"];

const faqs = [
  { q: "Ce inseamna \"preview in 1 ora\"?", a: "Pe baza informatiilor completate in formular, construim o versiune reala a site-ului tau si o publicam la firma-ta.dionixsoftworks.ro. Poti vedea exact cum va arata site-ul finalizat — nu e un mockup, e un site functional." },
  { q: "Platesc ceva pentru preview?", a: "Nu. Preview-ul este complet gratuit. Platesti doar daca preview-ul te convinge si decizi sa continui cu varianta finala pe domeniul tau propriu." },
  { q: "Cat dureaza sa primesc site-ul final?", a: "Dupa aprobare si plata, site-ul final livrat pe domeniul tau propriu este gata in 7 zile lucratoare. Pentru proiecte mai complexe (10+ pagini, functionalitati avansate) termenul poate fi 14-21 zile." },
  { q: "Ce se intampla cu preview-ul dupa?", a: "Preview-ul ramane activ 48 de ore. Daca decizi sa continui, mutam totul pe domeniul tau. Daca nu, stergem preview-ul fara niciun cost sau obligatie." },
  { q: "Pot face modificari fata de preview?", a: "Absolut. Preview-ul e un punct de start. Dupa aprobare, facem toate ajustarile — culori, texte, structura, imagini. Reviziile sunt incluse in pret pana esti 100% multumit." },
  { q: "Am nevoie de domeniu si hosting propriu?", a: "Nu neaparat — ne putem ocupa si de asta. Daca ai deja un domeniu, il folosim. Daca nu, te ajutam sa alegi si sa inregistrezi unul potrivit. Hostingul este inclus in pachetele de mentenanta lunara." },
];

export default function FunnelPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [timer, setTimer] = useState("59:59");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [data, setData] = useState<FormData>({
    name: "", industry: "", desc: "", site: "",
    pages: ["Home", "Despre noi", "Servicii", "Contact"],
    extra: "", color: "dark", style: "minimal",
    email: "", phone: "", pkg: "",
  });
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.name.trim()) e.name = "Camp obligatoriu";
      if (!data.industry.trim()) e.industry = "Camp obligatoriu";
      if (data.desc.trim().length < 30) e.desc = "Minim 30 caractere";
    }
    if (s === 2 && data.pages.length === 0) e.pages = "Selecteaza cel putin o pagina";
    if (s === 4) {
      if (!data.email || !data.email.includes("@")) e.email = "Email invalid";
      if (!data.phone.trim()) e.phone = "Camp obligatoriu";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => s + 1); };
  const prev = () => setStep((s) => s - 1);

  const togglePage = (p: string) => {
    setData((d) => ({
      ...d,
      pages: d.pages.includes(p) ? d.pages.filter((x) => x !== p) : [...d.pages, p],
    }));
  };

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submit = async () => {
    if (!validate(4)) return;
    
    setLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.name,
          industry: data.industry,
          description: data.desc,
          website: data.site,
          pages: data.pages,
          extra: data.extra,
          color: data.color,
          style: data.style,
          pkg: data.pkg,
        }),
      });

      if (response.ok) {
        const slug = data.name.toLowerCase()
          .replace(/\s+srl|\s+sa|\s+sas|\./gi, "").trim()
          .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").substring(0, 28);
        setPreviewUrl(`${slug}.dionixsoftworks.ro`);
        setSubmitted(true);
        let secs = 3599;
        const iv = setInterval(() => {
          if (secs <= 0) { clearInterval(iv); setTimer("Gata!"); return; }
          const m = Math.floor(secs / 60), s = secs % 60;
          setTimer(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
          secs--;
        }, 1000);
      } else {
        const result = await response.json();
        setSubmitError(result.error || "Eroare la trimitere. Te rugăm să încerci din nou.");
      }
    } catch (error) {
      setSubmitError("Eroare de conexiune. Te rugăm să încerci din nou.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-3 text-sm border bg-bg text-text outline-none transition-colors duration-200 ${errors[field] ? "border-red-500" : "border-border"}`;

  const getItems = [
    { icon: "🎨", title: "Design 100% personalizat", desc: "Niciun template generic — fiecare site e construit specific pentru afacerea ta, cu culorile si stilul tau." },
    { icon: "📱", title: "Perfect pe orice ecran", desc: "Mobile, tableta, desktop — site-ul tau arata impecabil si se incarca rapid pe orice dispozitiv." },
    { icon: "🔍", title: "Optimizat pentru Google", desc: "SEO de baza configurat, Google Analytics, Search Console — clientii te gasesc cand cauta ce oferi." },
    { icon: "⚡", title: "Viteza maxima", desc: "Site rapid = mai multi vizitatori. Google penalizeaza site-urile lente — ale noastre nu sunt." },
    { icon: "🔒", title: "SSL + Deploy inclus", desc: "Te ocupi tu de business, eu ma ocup de tehnic. Primesti site-ul live pe domeniul tau, gata de folosit." },
    { icon: "∞", title: "Revizii pana esti multumit", desc: "30 de zile suport gratuit dupa lansare. Modificari fara taxe suplimentare pana la aprobarea finala." },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">

      <div className="hidden md:flex  justify-center items-center gap-3 py-3 px-4 md:px-12 font-mono text-xs tracking-wide bg-surface border-b border-border text-muted">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <div className="flex flex-col md:flex-row">
          <span className="text-accent">LIVE ACUM —</span>
          <span className="hidden sm:inline">Preview site-ul tau in </span>
          <span className="text-accent">mai putin de 1 ora</span>
        </div>
          , fara costuri initiale
      </div>

      <nav className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-12 py-5 border-b border-border bg-bg/95 backdrop-blur-md">
        <Link href="/" className="font-mono text-sm tracking-wider text-text">
          Dionix<span className="text-accent">.</span>Softworks
        </Link>
        <a href="#form" className="font-mono text-xs tracking-widest uppercase px-3 md:px-5 py-2 transition-all duration-200 text-accent border border-accent hover:bg-accent hover:text-bg">
          Vreau site-ul meu
        </a>
      </nav>

      <div id="top" className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-start">

          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 flex items-center gap-3 text-accent">
              <span className="w-6 md:w-8 h-px bg-accent" />
              Preview gratuit in 60 de minute
            </div>
            <h1 className="font-extrabold leading-[0.95] tracking-[-0.03em] mb-6 md:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Site-ul tau,<br className="hidden sm:block" />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(232,237,242,0.25)]">live</span> in<br className="hidden sm:block" />
              <span className="text-accent">1 ora.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed md:leading-[1.75] mb-8 md:mb-12 text-text-mid">
              Completeaza un formular de <strong className="text-text">3 minute</strong>.
              Primesti un <strong className="text-text">preview real</strong> la{" "}
              <strong className="text-text">firma-ta.dionixsoftworks.ro</strong>.
              Platesi doar daca iti place.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-8 md:mb-12">
              {[
                { num: "60", unit: "min", lbl: "pana la preview" },
                { num: "0", unit: "€", lbl: "cost initial" },
                { num: "199", unit: "€", lbl: "de la" },
                { num: "7", unit: "zile", lbl: "livrare" },
              ].map(({ num, unit, lbl }, i) => (
                <div key={i} className="py-4 md:py-5 px-2 md:px-4 text-center bg-bg">
                  <div className="font-mono text-xl md:text-2xl lg:text-[26px] font-bold text-text">
                    {num}<span className="text-accent">{unit}</span>
                  </div>
                  <div className="font-mono text-[1em] md:text-xs tracking-widest uppercase mt-1.5 text-muted">{lbl}</div>
                </div>
              ))}
            </div>

            <div className="space-y-0">
              {[
                { num: "01", title: "Completeaza formularul (3 min)", desc: "Ne spui despre firma ta, ce pagini vrei si cum vrei sa arate. Simplu si rapid." },
                { num: "02", title: "Primesti preview-ul pe email (<1 ora)", desc: "Construim o versiune reala si o publicam la firma-ta.dionixsoftworks.ro" },
                { num: "03", title: "Iti place? Continuam.", desc: "Daca preview-ul te convinge, platesi si finalizam site-ul complet in 7 zile." },
                { num: "04", title: "Mutam pe domeniul tau", desc: "firma-ta.ro cu SSL, Google Analytics si deploy complet inclus." },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4 md:gap-6 py-4 md:py-5 border-b border-border group">
                  <div className="font-mono text-xl md:text-2xl lg:text-[28px] font-bold flex-shrink-0 w-8 md:w-9 transition-colors duration-300 text-border group-hover:text-accent">
                    {num}
                  </div>
                  <div>
                    <div className="text-sm md:text-[15px] font-bold mb-1">{title}</div>
                    <div className="text-xs md:text-[13px] leading-relaxed text-muted">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="form" className="lg:sticky lg:top-20">
            {!submitted ? (
              <div className="border border-border bg-surface">
                <div className="px-6 md:px-8 py-6 md:py-7 bg-surface2 border-b border-border">
                  <div className="inline-flex items-center gap-2 font-mono text-[1em] tracking-[0.15em] uppercase px-3 py-1.5 mb-3 md:mb-3.5 bg-accent/10 border border-accent/30 text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Live acum
                  </div>
                  <div className="text-lg md:text-xl lg:text-[22px] font-extrabold tracking-[-0.02em] mb-1.5">Vreau preview-ul meu</div>
                  <div className="font-mono text-[11px] text-muted">Completeaza in 3 min — preview in &lt;1 ora</div>
                </div>

                <div className="flex items-center px-4 md:px-8 py-3 md:py-4 bg-black/20 border-b border-border">
                  {stepLabels.map((lbl, i) => {
                    const n = i + 1;
                    const isDone = step > n;
                    const isActive = step === n;
                    return (
                      <div key={lbl} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-mono text-[1em] md:text-[11px] font-bold transition-all duration-300 ${
                              isDone ? "bg-accent border-none text-bg" :
                              isActive ? "border-2 border-accent text-accent shadow-[0_0_12px_rgba(0,229,255,0.2)]" :
                              "border-2 border-border text-muted"
                            }`}
                          >
                            {isDone ? "✓" : n}
                          </div>
                          <div className={`font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase transition-colors duration-300 ${
                            isDone ? "text-accent/50" : isActive ? "text-accent" : "text-muted"
                          }`}>
                            {lbl}
                          </div>
                        </div>
                        {i < stepLabels.length - 1 && (
                          <div className={`flex-1 h-px mx-1 mb-3 transition-colors duration-300 ${step > n ? "bg-accent" : "bg-border"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="px-6 md:px-8 py-5 md:py-7">

                  {step === 1 && (
                    <div>
                      <div className="text-base md:text-[1em] font-bold mb-1">Despre firma ta</div>
                      <div className="font-mono text-[1em] mb-4 md:mb-6 text-muted">Cateva detalii de baza</div>
                      {[
                        { id: "name", label: "Numele firmei", placeholder: "ex: Little Art Design SRL", req: true },
                        { id: "industry", label: "Domeniu de activitate", placeholder: "ex: Arhitectura, Cabinet medical...", req: true },
                      ].map((f) => (
                        <div key={f.id} className="mb-4 md:mb-[1em]">
                          <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 flex justify-between text-muted">
                            {f.label} {f.req && <span className="text-accent">*</span>}
                          </div>
                          <input className={inputCls(f.id)} placeholder={f.placeholder}
                            value={data[f.id as keyof FormData] as string}
                            onChange={(e) => setData((d) => ({ ...d, [f.id]: e.target.value }))} />
                          {errors[f.id] && <div className="font-mono text-[1em] mt-1 text-red-500">{errors[f.id]}</div>}
                        </div>
                      ))}
                      <div className="mb-4 md:mb-[1em]">
                        <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 flex justify-between text-muted">
                          Scurta descriere <span className="text-accent">*</span>
                        </div>
                        <textarea className={inputCls("desc")} rows={3} placeholder="Ce face firma ta si pentru cine? (min 30 caractere)"
                          value={data.desc} onChange={(e) => setData((d) => ({ ...d, desc: e.target.value }))} />
                        {errors.desc && <div className="font-mono text-[1em] mt-1 text-red-500">{errors.desc}</div>}
                      </div>
                      <div className="mb-4 md:mb-[1em]">
                        <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 text-muted">Site actual (daca ai)</div>
                        <input className={inputCls("site")} placeholder="https://firma-ta.ro"
                          value={data.site} onChange={(e) => setData((d) => ({ ...d, site: e.target.value }))} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div className="text-base md:text-[1em] font-bold mb-1">Ce pagini vrei?</div>
                      <div className="font-mono text-[1em] mb-4 md:mb-6 text-muted">Selecteaza tot ce ai nevoie</div>
                      <div className="grid grid-cols-2 gap-1.5 mb-4 md:mb-[1em]">
                        {pages.map((p) => {
                          const sel = data.pages.includes(p);
                          const icons: Record<string, string> = { Home: "🏠", "Despre noi": "👥", Servicii: "⚙", Contact: "📞", Portofoliu: "🕶", Blog: "📝", Testimoniale: "⭐", Preturi: "💰" };
                          return (
                            <div key={p} onClick={() => togglePage(p)}
                              className={`flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-all duration-150 select-none ${
                                sel ? "border border-accent/40 bg-accent/5" : "border border-border"
                              }`}>
                              <div className={`w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                                sel ? "border-2 border-accent bg-accent" : "border-2 border-border"
                              }`}>
                                {sel && <span className="text-[9px] font-bold text-bg">✓</span>}
                              </div>
                              <span className="text-xs text-muted text-[15.5px]">{icons[p]} {p}</span>
                            </div>
                          );
                        })}
                      </div>
                      {errors.pages && <div className="font-mono text-[1em] mb-3 text-red-500">{errors.pages}</div>}
                      <div>
                        <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 text-muted">Altceva specific?</div>
                        <input className={inputCls("extra")} placeholder="ex: Programari online, Calculator..."
                          value={data.extra} onChange={(e) => setData((d) => ({ ...d, extra: e.target.value }))} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <div className="text-base md:text-[16px] font-bold mb-1">Cum vrei sa arate?</div>
                      <div className="font-mono text-[11px] mb-4 md:mb-6 text-muted">Alege stilul si culorile brandului tau</div>
                      <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 text-muted">
                        Culori <span className="text-accent">*</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 mb-4 md:mb-5">
                        {colors.map((c) => (
                          <div key={c.id} onClick={() => setData((d) => ({ ...d, color: c.id }))}
                            className={`cursor-pointer transition-transform duration-150 hover:scale-105 overflow-hidden relative ${data.color === c.id ? "ring-2 ring-accent" : ""}`}>
                            <div className={`h-8 ${c.gradient}`} />
                            <div className="font-mono text-[11px] px-1.5 py-1.5 bg-surface2 text-muted">{c.name}</div>
                            {data.color === c.id && <span className="absolute top-1 right-1.5 text-[1em] font-bold text-white">✓</span>}
                          </div>
                        ))}
                      </div>
                      <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 text-muted">
                        Stil <span className="text-accent">*</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {styles.map((s) => (
                          <div key={s.id} onClick={() => setData((d) => ({ ...d, style: s.id }))}
                            className={`relative cursor-pointer px-3 py-3 transition-all duration-150 ${
                              data.style === s.id ? "border border-accent/40 bg-accent/5" : "border border-border"
                            }`}>
                            {data.style === s.id && <span className="absolute top-2 right-2.5 text-[1em] font-mono text-accent">✓</span>}
                            <div className="text-base mb-1.5">{s.icon}</div>
                            <div className={`text-xs font-bold mb-0.5 ${data.style === s.id ? "text-accent" : "text-text-mid"}`}>{s.name}</div>
                            <div className="font-mono text-[0.9em] leading-relaxed text-muted">{s.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <div className="text-base md:text-[16px] font-bold mb-1">Unde trimitem preview-ul?</div>
                      <div className="font-mono text-[11px] mb-4 md:mb-6 text-muted">In mai putin de 1 ora primesti link-ul pe email</div>
                      {[
                        { id: "email", label: "Email", placeholder: "contact@firma-ta.ro", type: "email", req: true },
                        { id: "phone", label: "Telefon", placeholder: "+40 7XX XXX XXX", type: "tel", req: true },
                      ].map((f) => (
                        <div key={f.id} className="mb-4 md:mb-[1em]">
                          <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 flex justify-between text-muted">
                            {f.label} {f.req && <span className="text-accent">*</span>}
                          </div>
                          <input type={f.type} className={inputCls(f.id)} placeholder={f.placeholder}
                            value={data[f.id as keyof FormData] as string}
                            onChange={(e) => setData((d) => ({ ...d, [f.id]: e.target.value }))} />
                          {errors[f.id] && <div className="font-mono text-[1em] mt-1 text-red-500">{errors[f.id]}</div>}
                        </div>
                      ))}
                      <div className="mb-4 md:mb-[1em]">
                        <div className="font-mono text-[1em] tracking-[0.12em] uppercase mb-2 text-muted">Pachetul dorit</div>
                        <select className={inputCls("pkg")} value={data.pkg} onChange={(e) => setData((d) => ({ ...d, pkg: e.target.value }))}>
                          <option value="">Nu stiu inca — ma consiliati voi</option>
                          <option>Landing Page — 199€</option>
                          <option>Site Complet — 299€</option>
                          <option>Site Premium — 449€</option>
                          <option>Proiect custom — de la 399€</option>
                        </select>
                      </div>
                      <div className="p-4 font-mono text-[14px] leading-relaxed bg-bg border border-border text-muted">
                        <div className="text-[1em] tracking-widest uppercase mb-2.5 text-accent">Ce se intampla dupa</div>
                        ● Preview pe email in <span className="text-text">max 1 ora</span><br />
                        ● Link activ <span className="text-text">48 ore</span><br />
                        ● Platesi doar daca <span className="text-text">continui</span><br />
                        ● <span className="text-accent">Zero costuri</span> pentru preview
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-5 md:mt-6 pt-4 md:pt-5 border-t border-border">
                    {step > 1 && (
                      <button onClick={prev} className="px-3 md:px-4 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-200 bg-transparent text-muted border border-border hover:border-text-muted hover:text-text">
                        ←
                      </button>
                    )}
                    {step < 4 ? (
                      <button onClick={next} className="flex-1 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent">
                        Continua →
                      </button>
                    ) : (
                      <button onClick={submit} disabled={loading} className="flex-1 py-3.5 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-200 bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Se trimite..." : "Vreau preview-ul →"}
                      </button>
                    )}
                  </div>
                  
                  {submitError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="font-mono text-[11px] text-red-500 text-center">{submitError}</p>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-wrap gap-2 md:gap-4 mt-3 pt-3 border-t border-border">
                      <span className="font-mono text-[12px] text-muted">🔒 Preview gratuit</span>
                      <span className="font-mono text-[12px] text-muted">✕ Fara spam</span>
                      <span className="font-mono text-[12px] text-muted">⚡ &lt;1 ora</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-10 text-center border border-border bg-surface">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-2xl font-extrabold tracking-[-0.02em] mb-2">
                  Cererea ta a fost <span className="text-accent">primita!</span>
                </h2>
                <p className="font-mono text-xs leading-relaxed mb-6 text-muted">
                  Lucram la preview-ul tau. Vei primi un email in mai putin de 1 ora.
                </p>
                <div className="font-mono text-sm px-5 py-3.5 mb-6 break-all text-accent bg-accent/10 border border-accent/30">
                  {previewUrl}
                </div>
                <div className="font-mono text-4xl md:text-5xl font-bold mb-1.5 leading-none text-accent">{timer}</div>
                <div className="font-mono text-[1em] tracking-[0.15em] uppercase mb-7 text-muted">
                  timp estimat pana la preview
                </div>
                <div className="pt-5 border-t border-border">
                  <span className="font-mono text-xs text-muted">
                    Intrebari?{" "}
                    <a href="mailto:contact@dionixsoftworks.ro" className="text-accent hover:underline">
                      contact@dionixsoftworks.ro
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-y border-border bg-surface">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {["Preview Gratuit", "Design Custom", "Mobile Ready", "SEO Inclus", "Livrare 7 Zile", "Revizii Nelimitate"].map((item) => (
                <span key={item} className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 md:px-10 py-3 md:py-3.5 whitespace-nowrap text-muted">
                  <span className="text-accent mr-2">→</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface border-y border-border py-16 md:py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            ref={(el) => { revealRefs.current[0] = el; }}
            className="reveal fade-up-1 font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent"
          >
            <span className="w-6 h-px bg-accent" />
            Ce primesti
          </div>
          <h2
            ref={(el) => { revealRefs.current[1] = el; }}
            className="reveal fade-up-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] mb-4 md:mb-8"
          >
            Tot ce are nevoie<br />firma ta <span className="text-accent">online.</span>
          </h2>
          <div
            ref={(el) => { revealRefs.current[2] = el; }}
            className="reveal fade-up-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border mt-10 md:mt-14"
          >
            {getItems.map((item, i) => (
              <div key={i} className="group p-6 md:p-8 lg:p-10 transition-colors duration-300 relative overflow-hidden bg-bg hover:bg-surface2">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <span className="text-2xl md:text-3xl mb-4 md:mb-5 block">{item.icon}</span>
                <div className="text-base md:text-[16px] font-bold mb-2 md:mb-2.5 tracking-[-0.01em] text-text">{item.title}</div>
                <div className="text-sm md:text-[13px] leading-relaxed text-text-mid">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={(el) => { revealRefs.current[3] = el; }}
        className="reveal fade-up-1 py-16 md:py-20 px-4 md:px-12 text-center bg-surface border-y border-border"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl md:text-5xl font-mono mb-4 md:mb-5 text-border">&ldquo;</div>
          <div className="text-xl md:text-2xl lg:text-[28px] font-bold leading-relaxed tracking-[-0.01em] mb-6 md:mb-8 text-text">
            Dionisie a livrat exact ce am cerut, in <em className="text-accent not-italic">timp record</em>. Site-ul nostru arata profesional si am inceput sa primim cereri noi direct de acolo.
          </div>
          <div className="font-mono text-xs md:text-[12px] text-muted tracking-wide">
            <strong className="text-accent">Client Dionix Softworks</strong> &nbsp;·&nbsp; Studio Arhitectura, Piatra-Neamt
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div
          ref={(el) => { revealRefs.current[4] = el; }}
          className="reveal fade-up-1 font-mono text-[11px] tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent"
        >
          <span className="w-6 h-px bg-accent" />
          FAQ
        </div>
        <h2
          ref={(el) => { revealRefs.current[5] = el; }}
          className="reveal fade-up-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.05] mb-8 md:mb-12"
        >
          Ai <span className="text-accent">intrebari?</span><br />
          <span className="text-transparent [-webkit-text-stroke:1px_#1E2733]">Noi avem raspunsuri.</span>
        </h2>
        <div className="reveal fade-up-1 flex flex-col gap-px bg-border border border-border mt-8 md:mt-14">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-bg">
              <div
                className="flex justify-between items-center gap-4 p-4 md:p-5 lg:p-6 cursor-pointer transition-colors duration-200 hover:bg-surface2"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="text-sm md:text-[15px] font-semibold text-text">{faq.q}</div>
                <div className={`font-mono text-lg md:text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""} text-accent`}>+</div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96" : "max-h-0"}`}>
                <div className="px-4 md:px-5 lg:px-7 pb-4 md:pb-5 lg:pb-6 text-sm md:text-[14px] leading-relaxed text-text-mid">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-20 md:py-28 lg:py-32 px-4 md:px-12 text-center relative overflow-hidden bg-surface border-t border-border">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        </div>
        <div
          ref={(el) => { revealRefs.current[6] = el; }}
          className="reveal fade-up-1 relative"
        >
          <h2 className="font-extrabold tracking-[-0.03em] leading-[0.95] mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Site-ul tau,<br className="hidden sm:block" />
            <span className="text-transparent [-webkit-text-stroke:1px_#1E2733]">live</span> in<br className="hidden sm:block" />
            <span className="text-accent">1 ora.</span>
          </h2>
          <p className="text-base md:text-[16px] mb-8 md:mb-12 max-w-md mx-auto leading-relaxed text-text-mid">
            Completeaza formularul in 3 minute si primesti un preview real al site-ului tau — gratuit, fara obligatii.
          </p>
          <button
            onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-200 bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
          >
            Vreau preview-ul meu →
          </button>
          <div className="font-mono text-[11px] mt-5 text-muted">
            0€ pentru preview &nbsp;·&nbsp; Platesi doar daca iti place &nbsp;·&nbsp; Link activ 48 ore
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
