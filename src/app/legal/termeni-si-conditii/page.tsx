import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsPage() {
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
          Termeni și Condiții
        </h1>
        
        <div className="font-mono text-[11px] text-text-muted mb-8">
          Ultima actualizare: 1 Ianuarie 2026
        </div>

        <div className="prose-content space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-mid">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">1. Introducere</h2>
            <p>
              Prin accesarea și utilizarea site-ului nostru web, acceptați să fiți legat de acești Termeni și Condiții. 
              Dacă nu sunteți de acord cu oricare parte a acestor termeni, vă rugăm să nu utilizați site-ul nostru.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">2. Serviciile Noastre</h2>
            <p>
              Dionix Softworks SRL oferă următoarele servicii:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Dezvoltare de aplicații web custom</li>
              <li>Creare de platforme SaaS</li>
              <li>Automatizări și integrări AI</li>
              <li>Servicii de redesign și modernizare</li>
              <li>Consultanță tehnică</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">3. Proprietatea Intelectuală</h2>
            <p>
              Tot conținutul prezentat pe acest site, incluzând dar nelimitându-se la texte, grafice, logo-uri, 
              imagini și software, este proprietatea Dionix Softworks SRL sau a furnizorilor săi de conținut și 
              este protejat de legile privind drepturile de autor.
            </p>
            <p className="mt-4">
              Codul livrat clientilor în urma proiectelor devine proprietatea deplină a clientului după 
              finalizarea plății.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">4. Prețuri și Plăți</h2>
            <p>
              Prețurile afișate pe site sunt orientative și pot fi modificate. Prețul final este stabilit 
              în urma discuțiilor și aprobării specificațiilor proiectului.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Plata se face conform contractului semnat</li>
              <li>Se poate solicita un avans de până la 50% din valoarea proiectului</li>
              <li>Restul plății se face la livrare</li>
              <li>Plățile sunt procesate în EUR sau RON</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">5. Termene de Livrare</h2>
            <p>
              Termenele de livrare sunt estimate și pot varia în funcție de complexitatea proiectului și 
              disponibilitatea resurselor. Dionix Softworks nu este responsabilă pentru întârzierile cauzate 
              de factori externi sau de modificările cerințelor în timpul dezvoltării.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">6. Garanție și Suport</h2>
            <p>
              Oferim 30 de zile de suport gratuit după livrare pentru orice proiect. 
              Garanția acoperă erorile de cod generate de noi și nu include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modificări cerute de client după livrare</li>
              <li>Probleme cauzate de modificări externe</li>
              <li>Actualizări de design sau funcționalități noi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">7. Limitarea Răspunderii</h2>
            <p>
              Dionix Softworks SRL nu va fi responsabilă pentru daune directe, indirecte, accidentale sau 
              consecințiale rezultate din utilizarea serviciilor noastre. Responsabilitatea noastră 
              maximă este limitată la valoarea plății primite pentru serviciul respectiv.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">8. Confidențialitate</h2>
            <p>
              Tratăm cu seriozitate confidențialitatea datelor clienților noștri. Toate informațiile 
              partajate în cadrul proiectelor sunt păstrate confidențiale și nu sunt partajate 
              cu terți fără consimțământ.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">9. Modificări ale Termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi 
              publicate pe această pagină și vor intra în vigoare imediat după publicare.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 mt-8 sm:mt-10">10. Contact</h2>
            <p>
              Pentru întrebări legate de acești termeni, ne puteți contacta la:
            </p>
            <div className="mt-4 p-4 bg-surface border border-border rounded-lg font-mono text-[13px]">
              <div className="text-accent mb-2">DIONIX SOFTWORKS SRL</div>
              <div>Email: contact@dionixsoftworks.ro</div>
              <div>CUI: 50834541</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
