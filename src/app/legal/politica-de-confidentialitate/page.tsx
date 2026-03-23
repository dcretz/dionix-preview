import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
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
          Politica de Confidențialitate
        </h1>
        
        <div className="font-mono text-[11px] text-text-muted mb-8">
          Ultima actualizare: 1 Ianuarie 2026
        </div>

        <div className="prose-content space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-mid">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">1. Introducere</h2>
            <p>
              DIONIX SOFTWORKS SRL (&quot;Dionix Softworks&quot;, &quot;noi&quot;, &quot;nostru&quot;) se angajează să protejeze 
              și să respecte confidențialitatea dumneavoastră. Această Politică de Confidențialitate 
              explică ce date personale colectăm, cum le folosim și drepturile dumneavoastră.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">2. Cine Suntem</h2>
            <div className="p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">DIONIX SOFTWORKS SRL</div>
              <div>CUI: 50834541</div>
              <div>Nr. Reg. Comerț: J2024038563007</div>
              <div>Sediu: Str. Dr. Leonte Anastasievici 9, Sector 5, București</div>
              <div>Email: contact@dionixsoftworks.ro</div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">3. Ce Date Colectăm</h2>
            <p>Colectăm următoarele categorii de date personale:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Date de contact:</strong> nume, adresă de email, număr de telefon</li>
              <li><strong>Date de afaceri:</strong> numele companiei, CUI, adresă de facturare</li>
              <li><strong>Date tehnice:</strong> adresă IP, tip browser, dispozitiv utilizat</li>
              <li><strong>Date de utilizare:</strong> pagini vizitate, timp petrecut pe site</li>
              <li><strong>Date din comunicări:</strong> conținutul emailurilor și formularelor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">4. Cum Folosim Datele</h2>
            <p>Folosim datele colectate pentru:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Furnizarea serviciilor noastre de dezvoltare web</li>
              <li>Comunicarea cu dumneavoastră despre proiecte și oferte</li>
              <li>Îmbunătățirea site-ului și serviciilor noastre</li>
              <li>Respectarea obligațiilor legale</li>
              <li>Marketing (doar cu consimțământul dumneavoastră)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">5. Temeiul Legal</h2>
            <p>Procesăm datele dumneavoastră pe baza:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Executării contractului:</strong> pentru a furniza serviciile solicitate</li>
              <li><strong>Interesului legitim:</strong> pentru îmbunătățirea serviciilor</li>
              <li><strong>Consimțământului:</strong> pentru marketing și cookies non-esențiale</li>
              <li><strong>Obligațiilor legale:</strong> pentru raportare fiscală și contabilă</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">6. Partajarea Datelor</h2>
            <p>Nu vindem și nu închiriem datele dumneavoastră personale. Putem partaja date cu:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Furnizori de servicii (hosting, email, analytics)</li>
              <li>Autorități competente, când este cerut legal</li>
              <li>Parteneri de afaceri, doar cu consimțământul dumneavoastră</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">7. Păstrarea Datelor</h2>
            <p>
              Păstrăm datele personale doar atât timp cât este necesar pentru scopurile pentru care 
              au fost colectate. În general:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Datele clienților: până la 5 ani după încheierea contractului</li>
              <li>Datele de contact (prospective): max 2 ani</li>
              <li>Datele de trafic: max 1 an</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">8. Drepturile Dumneavoastră</h2>
            <p>Aveți următoarele drepturi:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Acces:</strong> să solicitați o copie a datelor dumneavoastră</li>
              <li><strong>Rectificare:</strong> să corectăm datele inexacte</li>
              <li><strong>Ștergere:</strong> să solicitați ștergerea datelor (în anumite condiții)</li>
              <li><strong>Portabilitate:</strong> să primiți datele într-un format structurat</li>
              <li><strong>Opoziție:</strong> să vă opuneți procesării</li>
              <li><strong>Retragere consimțământ:</strong> oricând, pentru procesările bazate pe consimțământ</li>
            </ul>
            <p className="mt-4">
              Pentru a exercita oricare dintre aceste drepturi, contactați-ne la: 
              <a href="mailto:contact@dionixsoftworks.ro" className="text-accent hover:underline ml-1">
                contact@dionixsoftworks.ro
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">9. Securitate</h2>
            <p>
              Implementăm măsuri de securitate tehnice și organizatorice adecvate pentru a proteja 
              datele dumneavoastră împotriva accesului neautorizat, modificării, divulgării sau 
              distrugerii.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">10. Modificări</h2>
            <p>
              Putem actualiza această Politică de Confidențialitate periodic. Orice modificări vor fi 
              publicate pe această pagină. Vă încurajăm să verificați această pagină periodic.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">11. Contact</h2>
            <p>
              Pentru orice întrebări despre această Politică de Confidențialitate sau pentru a 
              exercita drepturile dumneavoastră, contactați-ne:
            </p>
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">Responsabil cu Protecția Datelor</div>
              <div>Email: contact@dionixsoftworks.ro</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
