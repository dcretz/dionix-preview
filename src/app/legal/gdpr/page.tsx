import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function GDPRPage() {
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
          Politica GDPR
        </h1>
        
        <div className="font-mono text-[11px] text-text-muted mb-8">
          Regulamentul General privind Protecția Datelor (UE) 2016/679
        </div>

        <div className="prose-content space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-mid">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">1. Informații Generale</h2>
            <p>
              DIONIX SOFTWORKS SRL, cu sediul în Str. Dr. Leonte Anastasievici 9, Sector 5, București, 
              CUI: 50834541, este operator de date personale în sensul Regulamentului General privind 
              Protecția Datelor (GDPR).
            </p>
            <p className="mt-4">
              Ne angajăm să protejăm drepturile dumneavoastră fundamentale și să respectăm spiritul 
              și cerințele GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">2. Principii</h2>
            <p>Procesăm datele personale conform următoarelor principii:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Legalitate și transparență:</strong> procesăm datele în mod legal și transparent</li>
              <li><strong>Limitarea scopului:</strong> colectăm doar datele necesare pentru scopuri specificate</li>
              <li><strong>Minimizarea datelor:</strong> păstrăm doar datele strict necesare</li>
              <li><strong>Exactitate:</strong> menținem datele exacte și actualizate</li>
              <li><strong>Limitarea păstrării:</strong> nu păstrăm datele mai mult decât este necesar</li>
              <li><strong>Integritate și confidențialitate:</strong> asigurăm securitatea adecvată</li>
              <li><strong>Responsabilitate:</strong> demonstrăm conformitatea cu toate principiile</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">3. Categorii de Date Procesate</h2>
            
            <h3 className="text-lg font-bold text-text mb-3 mt-6">3.1 Date de Identificare</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nume și prenume</li>
              <li>Adresă de email</li>
              <li>Număr de telefon</li>
              <li>Adresă poștală</li>
            </ul>

            <h3 className="text-lg font-bold text-text mb-3 mt-6">3.2 Date de Afaceri</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Denumirea companiei</li>
              <li>Cod unic de identificare (CUI)</li>
              <li>Adresă de facturare și sediu</li>
              <li>Date bancare (pentru plăți)</li>
            </ul>

            <h3 className="text-lg font-bold text-text mb-3 mt-6">3.3 Date Tehnice</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Adresă IP</li>
              <li>Tip și versiune browser</li>
              <li>Sistem de operare</li>
              <li>Dispozitiv utilizat</li>
              <li>Cookies (vezi secțiunea 7)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">4. Scopuri și Temeiuri Legale</h2>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-[13px] sm:text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-text font-bold">Scop</th>
                    <th className="text-left py-3 px-2 text-text font-bold">Temei Legal</th>
                  </tr>
                </thead>
                <tbody className="text-text-mid">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Furnizare servicii</td>
                    <td className="py-3 px-2">Executarea contractului</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Comunicări comerciale</td>
                    <td className="py-3 px-2">Consimțământul dumneavoastră</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Îmbunătățirea site-ului</td>
                    <td className="py-3 px-2">Interesul nostru legitim</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Obligații contabile</td>
                    <td className="py-3 px-2">Obligația legală</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Răspuns la solicitări</td>
                    <td className="py-3 px-2">Interesul legitim</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">5. Transfer de Date</h2>
            <p>
              Datele dumneavoastră pot fi transferate către:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Țări din Spațiul Economic European (SEE)</li>
              <li>Țări cu decizii de adecvare ale Comisiei Europene</li>
              <li>Furnizori din afara SEE (cu garanții adecvate)</li>
            </ul>
            <p className="mt-4">
              Oriunde ar fi transferate datele, asigurăm un nivel de protecție adecvat prin 
              contracte standard sau alte mecanisme legale.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">6. Drepturile Persoanelor Vizate</h2>
            <p>
              Conform GDPR, aveți următoarele drepturi pe care le puteți exercita contactându-ne:
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text mb-2">Dreptul de acces (Art. 15)</h3>
                <p className="text-[13px]">
                  Aveți dreptul să obțineți o copie a datelor dumneavoastră personale și informații 
                  despre cum le procesăm.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text mb-2">Dreptul la rectificare (Art. 16)</h3>
                <p className="text-[13px]">
                  Aveți dreptul să corectăm orice date personale inexacte sau incomplete.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text mb-2">Dreptul la ștergere (Art. 17)</h3>
                <p className="text-[13px]">
                  Aveți dreptul să solicitați ștergerea datelor dumneavoastră (&quot;dreptul de a fi uitat&quot;), 
                  în anumite circumstanțe.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text mb-2">Dreptul la portabilitate (Art. 20)</h3>
                <p className="text-[13px]">
                  Aveți dreptul să primiți datele într-un format structurat și să le transferați 
                  altui operator.
                </p>
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg">
                <h3 className="font-bold text-text mb-2">Dreptul la opoziție (Art. 21)</h3>
                <p className="text-[13px]">
                  Aveți dreptul să vă opuneți procesării bazate pe interesul nostru legitim.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">7. Politica de Cookies</h2>
            <p>
              Site-ul nostru folosește cookies pentru a funcționa corect și pentru a analiza 
              traficul. Aveți opțiunea de a accepta sau refuza cookies non-esențiale.
            </p>
            
            <h3 className="text-lg font-bold text-text mb-3 mt-6">Categorii de Cookies</h3>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-[13px] sm:text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-text font-bold">Tip</th>
                    <th className="text-left py-3 px-2 text-text font-bold">Scop</th>
                    <th className="text-left py-3 px-2 text-text font-bold">Obligatoriu</th>
                  </tr>
                </thead>
                <tbody className="text-text-mid">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Esențiale</td>
                    <td className="py-3 px-2">Funcționarea site-ului</td>
                    <td className="py-3 px-2">Da</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-2">Analitice</td>
                    <td className="py-3 px-2">Înțelegerea utilizării</td>
                    <td className="py-3 px-2">Nu</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Funcționale</td>
                    <td className="py-3 px-2">Preferințe utilizator</td>
                    <td className="py-3 px-2">Nu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">8. Încălcări de Securitate</h2>
            <p>
              În cazul unei încălcări de securitate care afectează drepturile dumneavoastră, 
              ne angajăm să:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Notificăm autoritatea de supraveghere (ANSPDCP) în maxim 72 de ore</li>
              <li>Comunicăm persoanelor afectate, dacă riscul este ridicat</li>
              <li>Documentăm toate încălcările și măsurile luate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">9. Reclamații</h2>
            <p>
              Aveți dreptul să depuneți o plângere la autoritatea de supraveghere din România:
            </p>
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</div>
              <div>B-dul Gheorghe Magheru 28-30, Sector 1, București</div>
              <div>Email: anspdcp@dataprotection.ro</div>
              <div>Telefon: +40 31 805 9211</div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">10. Contact</h2>
            <p>
              Pentru orice întrebări despre procesarea datelor dumneavoastră sau pentru a 
              exercita drepturile GDPR:
            </p>
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">DIONIX SOFTWORKS SRL</div>
              <div>Persoană de contact: Echipa Dionix Softworks</div>
              <div>Email: contact@dionixsoftworks.ro</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
