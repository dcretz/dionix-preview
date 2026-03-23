"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />
      
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 pt-[120px] sm:pt-[140px] pb-[60px] sm:pb-[80px] md:pb-[120px]">
        <div className="mb-8 sm:mb-12">
          <Link href="/" className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors">
            ← Acasă
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-6">
          Politica de Cookies
        </h1>
        
        <div className="font-mono text-[11px] text-text-muted mb-8">
          Ultima actualizare: 1 Ianuarie 2026
        </div>

        <div className="prose-content space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-mid">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">1. Ce Sunt Cookies?</h2>
            <p>
              Cookie-urile sunt fișiere text mici stocate pe dispozitivul dumneavoastră (computer, 
              tabletă sau telefon mobil) atunci când vizitați un site web. Ele ajută site-urile 
              să funcționeze corect, să fie mai sigure și să ofere o experiență mai bună 
              utilizatorilor.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">2. De Ce Folosim Cookies?</h2>
            <p>Folosim cookies pentru mai multe scopuri:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Funcționarea corectă a site-ului</li>
              <li>Memorarea preferințelor dumneavoastră</li>
              <li>Analizarea modului în care utilizați site-ul</li>
              <li>Îmbunătățirea experienței de navigare</li>
              <li>Afișarea de conținut relevant</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">3. Tipuri de Cookies</h2>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 sm:p-5 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text text-[14px] sm:text-[15px] mb-2">
                  🍪 Cookies Esențiale
                </h3>
                <p className="text-[13px] sm:text-[14px] text-text-mid">
                  <strong className="text-text">Obligatorii.</strong> Aceste cookies sunt necesare 
                  pentru ca site-ul nostru să funcționeze. Ele permit funcționalități de bază 
                  precum navigarea, accesul la zone securizate și formularele de contact.
                  <br /><br />
                  <strong>Nu pot fi dezactivate.</strong> Fără aceste cookies, site-ul nu ar 
                  funcționa corect.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text text-[14px] sm:text-[15px] mb-2">
                  📊 Cookies Analitice
                </h3>
                <p className="text-[13px] sm:text-[14px] text-text-mid">
                  <strong className="text-text">Opționale.</strong> Aceste cookies ne ajută să 
                  înțelegem cum vizitatorii interacționează cu site-ul nostru, colectând informații 
                  anonime despre paginile vizitate, timpul petrecut și eventualele erori.
                  <br /><br />
                  Folosim Google Analytics în mod anonim.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text text-[14px] sm:text-[15px] mb-2">
                  ⚙️ Cookies Funcționale
                </h3>
                <p className="text-[13px] sm:text-[14px] text-text-mid">
                  <strong className="text-text">Opționale.</strong> Aceste cookies permit 
                  funcții avansate precum memorarea preferințelor, setărilor de utilizator 
                  și chat-ul live.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">4. Cookies Folosite</h2>
            
            <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
              <table className="w-full min-w-[500px] text-[12px] sm:text-[13px] md:text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface2">
                    <th className="text-left py-3 px-3 sm:px-4 text-text font-bold">Nume</th>
                    <th className="text-left py-3 px-3 sm:px-4 text-text font-bold">Tip</th>
                    <th className="text-left py-3 px-3 sm:px-4 text-text font-bold">Scop</th>
                    <th className="text-left py-3 px-3 sm:px-4 text-text font-bold">Durată</th>
                  </tr>
                </thead>
                <tbody className="text-text-mid">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-3 sm:px-4">cookie-consent</td>
                    <td className="py-3 px-3 sm:px-4">Esențial</td>
                    <td className="py-3 px-3 sm:px-4">Preferințe cookies</td>
                    <td className="py-3 px-3 sm:px-4">1 an</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-3 sm:px-4">_ga</td>
                    <td className="py-3 px-3 sm:px-4">Analitic</td>
                    <td className="py-3 px-3 sm:px-4">Google Analytics</td>
                    <td className="py-3 px-3 sm:px-4">2 ani</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-3 sm:px-4">_gid</td>
                    <td className="py-3 px-3 sm:px-4">Analitic</td>
                    <td className="py-3 px-3 sm:px-4">Google Analytics</td>
                    <td className="py-3 px-3 sm:px-4">24 ore</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">5. Gestionarea Cookies</h2>
            <p>
              Puteți gestiona preferințele de cookies folosind butonul de mai jos sau 
              modificând setările browser-ului dumneavoastră.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem("cookie-consent");
                  window.location.reload();
                }}
                className="px-5 py-3 font-mono text-[12px] tracking-wider uppercase bg-surface border border-border text-text-mid hover:border-accent hover:text-accent transition-all duration-200"
              >
                🔄 Resetează Preferințe
              </button>
            </div>

            <h3 className="text-lg font-bold text-text mb-3 mt-8">Cum să dezactivezi cookies în browser</h3>
            <p className="mb-4">Puteți dezactiva cookies din setările browser-ului:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-4 text-[13px] text-text-muted">
              Rețineți că dezactivarea cookies poate afecta funcționalitatea site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">6. Modificări</h2>
            <p>
              Putem actualiza această Politică de Cookies periodic. Orice modificări vor fi 
              publicate pe această pagină. Vă încurajăm să verificați periodic această pagină.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">7. Contact</h2>
            <p>
              Pentru întrebări despre utilizarea cookies, contactați-ne:
            </p>
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">DIONIX SOFTWORKS SRL</div>
              <div>Email: contact@dionixsoftworks.ro</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
