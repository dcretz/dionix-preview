import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-8 bg-bg text-text">
      <div>
        <div className="font-mono text-[120px] font-bold leading-none mb-4 text-border">
          404
        </div>
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] mb-4">
          Pagina nu există
        </h1>
        <p className="font-mono text-sm mb-10 text-text-muted">
          S-ar putea să fi urmat un link greșit sau pagina a fost mutată.
        </p>
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-widest uppercase px-9 py-4 transition-all duration-200 inline-block bg-accent text-bg hover:bg-transparent hover:text-accent hover:outline hover:outline-1 hover:outline-accent"
        >
          ← Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
