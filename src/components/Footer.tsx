"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <div className="font-mono text-sm mb-4 text-text">
              Dionix<span className="text-accent">.</span>Softworks
            </div>
            <p className="font-mono text-xs leading-relaxed text-text-muted max-w-[240px]">
              Construim aplicatii web custom, platforme SaaS si automatizari AI pentru afaceri care vor sa creasca online.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-4">
              Servicii
            </div>
            <div className="space-y-2">
              <Link href="/website-in-1-ora" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Website in 1 ora
              </Link>
              <Link href="/#contact" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Dezvoltare custom
              </Link>
              <Link href="/#servicii" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                AI & Automatizari
              </Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-4">
              Companie
            </div>
            <div className="space-y-2">
              <Link href="/blog" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Blog
              </Link>
              <Link href="/#despre" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Despre noi
              </Link>
              <Link href="/#proces" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Proces
              </Link>
              <Link href="/#contact" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted mb-4">
              Legal
            </div>
            <div className="space-y-2">
              <Link href="/legal/termeni-si-conditii" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Termeni si conditii
              </Link>
              <Link href="/legal/politica-de-confidentialitate" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Politica de confidentialitate
              </Link>
              <Link href="/legal/gdpr" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                GDPR
              </Link>
              <Link href="/legal/cookies" className="block font-mono text-xs text-text-mid hover:text-accent transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <div className="font-mono text-[10px] text-center md:text-left text-text-muted">
            <span className="text-accent">DIONIX SOFTWORKS SRL</span>
            &nbsp;·&nbsp; CUI: 50834541 &nbsp;·&nbsp; J2024038563007
            <br className="hidden md:block" />
            Str. Dr. Leonte Anastasievici 9, Sector 5, Bucuresti &nbsp;·&nbsp;
            <Link href="mailto:contact@dionixsoftworks.ro" className="text-accent hover:underline">
              contact@dionixsoftworks.ro
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="mailto:contact@dionixsoftworks.ro" className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase border border-border text-text-muted hover:border-accent hover:text-accent transition-all duration-200">
              Email
            </Link>
            <Link href="/#contact" className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase bg-accent text-bg hover:bg-transparent hover:text-accent transition-all duration-200">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <div className="font-mono text-[11px] text-text-muted">
            © 2026 Dionix Softworks. Toate drepturile rezervate.
          </div>
        </div>
      </div>
    </footer>
  );
}
