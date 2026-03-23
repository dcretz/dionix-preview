"use client";

const steps = [
  { num: "01", title: "Discovery", desc: "Înțelegem problema reală. Un apel de 45 min cu întrebările corecte." },
  { num: "02", title: "Propunere", desc: "Arhitectura tehnică, timeline realist și prețuri clare. Fără surprize." },
  { num: "03", title: "Build", desc: "Dezvoltare iterativă. Vezi progresul în timp real pe un mediu de staging." },
  { num: "04", title: "Lansare & Suport", desc: "Deploy, testing complet, predare cu documentație. Disponibili după lansare." },
];

const whyItems = [
  { icon: "🎯", title: "Full-stack & AI nativ", desc: "De la baza de date la interfață și agenți AI — totul in-house." },
  { icon: "⚡", title: "Comunicare directă", desc: "Vorbești cu dev-ul. Deciziile se iau rapid, feedback-ul în ore." },
  { icon: "🔒", title: "Cod pe care îl deții tu", desc: "Acces complet la repository. Fără lock-in, fără surprize." },
  { icon: "📈", title: "Construit pentru scalare", desc: "Arhitectura corectă de la start — nu soluții care se rup la 1000 utilizatori." },
];

export function Process() {
  return (
    <section
      className="py-[120px] px-12 relative z-10 bg-surface border-t border-border"
      id="proces"
    >
      <div className="max-w-[1200px] mx-auto mb-20 reveal">
        <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
          <span className="w-6 h-px bg-accent" />
          Cum lucrăm
        </div>
        <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(36px,5vw,56px)]">
          Procesul
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_var(--border)]">
            Nostru
          </span>
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 reveal bg-border">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className="relative p-12 bg-surface"
          >
            <div className="font-mono text-5xl font-bold leading-none mb-6 text-border">
              {s.num}
            </div>
            <h3 className="text-lg font-bold mb-3">{s.title}</h3>
            <p className="text-sm leading-[1.6] text-text-mid">
              {s.desc}
            </p>
            {i < steps.length - 1 && (
              <span className="absolute top-12 -right-3 text-xl z-10 text-accent">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="py-[120px] px-12 relative z-10" id="despre">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="reveal">
          <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-3 text-accent">
            <span className="w-6 h-px bg-accent" />
            De ce Dionix Softworks
          </div>
          <h2 className="font-extrabold leading-[1.05] tracking-[-0.02em] mb-6 text-[clamp(36px,4vw,56px)]">
            Software serios,
            <br />
            <em className="not-italic text-accent">livrat</em> la timp.
          </h2>
          <p className="text-base leading-[1.8] mb-10 text-text-mid">
            Echipă mică = avantaj. Vorbești direct cu omul care scrie codul.
            Fără account manageri, fără telefoane reci, fără estimări umflate.
          </p>
          <a
            href="#contact"
            className="font-mono text-sm font-bold tracking-widest uppercase px-9 py-4 transition-all duration-200 inline-block bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
          >
            Hai să construim ceva
          </a>
        </div>

        <div className="flex flex-col gap-4 reveal">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 items-start p-6 transition-colors duration-200 hover:border-accent border border-border"
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <h4 className="text-sm font-bold mb-1.5">{item.title}</h4>
                <p className="text-sm leading-[1.6] text-text-mid">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
