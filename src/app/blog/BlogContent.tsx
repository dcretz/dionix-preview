"use client";

import { useState, useEffect, useRef } from "react";
import type { BlogPost } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "all", label: "Toate" },
  { id: "dev", label: "Development" },
  { id: "ai", label: "AI & Automatizare" },
  { id: "saas", label: "SaaS & Produse" },
  { id: "business", label: "Business" },
];

const visualLines = [
  ["", "accent", "short", "", "accent", "short"],
  ["accent", "short", "", "short", "accent", ""],
  ["", "", "accent", "accent", "", "short"],
  ["accent", "short", "", "", "short", "accent"],
  ["short", "accent", "", "accent", "short", ""],
];

function mapTagToCategory(tags: string[]): string {
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("ai") || tagStr.includes("llm") || tagStr.includes("automatizare") || tagStr.includes("chatbot")) return "ai";
  if (tagStr.includes("saas") || tagStr.includes("multi-tenant") || tagStr.includes("roadmap")) return "saas";
  if (tagStr.includes("business") || tagStr.includes("proces") || tagStr.includes("discovery")) return "business";
  return "dev";
}

function TerminalVisual() {
  return (
    <div className="font-mono text-[10px] sm:text-[11px] text-accent/25 leading-[2] p-4 sm:p-6 md:p-10 whitespace-pre user-select-none">
      {`$ npm install @openai/sdk
✓ Installing...
✓ Agent ready

> agent.run({...})
→ thinking...
✓ Task done`}
    </div>
  );
}

function LineVisual({ pattern }: { pattern: string[] }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-3 sm:p-5 gap-1.5">
      {pattern.map((cls, i) => (
        <div
          key={i}
          className={`h-px ${
            cls === "accent"
              ? "bg-accent/30 w-[60%]"
              : cls === "short"
              ? "bg-accent/10 w-[40%]"
              : "bg-accent/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState("all");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        document.querySelector('nav')?.classList.add('nav-scrolled');
      } else {
        document.querySelector('nav')?.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const filteredPosts = posts.filter((p) => filter === "all" || mapTagToCategory(p.tags) === filter);
  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog", date: new Date().toISOString() }),
      });
      
      if (response.ok) {
        setSubscribed(true);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="bg-bg text-text min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <div
        ref={(el) => { revealRefs.current[0] = el; }}
        className="reveal max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 pt-[120px] sm:pt-[140px] md:pt-[160px] pb-10 sm:pb-16 md:pb-[80px] relative z-10"
      >
        <div
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-accent"
          style={{ opacity: 0, animation: "fadeUp 0.6s ease forwards 0.2s" }}
        >
          <span className="w-6 sm:w-8 h-px bg-accent" />
          Gânduri & resurse
        </div>
        <h1
          className="font-extrabold leading-[0.95] tracking-[-0.03em] mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(48px,6vw,80px)]"
          style={{ opacity: 0, animation: "fadeUp 0.7s ease forwards 0.35s" }}
        >
          Scris de<br />
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(232,237,242,0.2)]">oameni</span><br />
          <span className="text-accent">care codează.</span>
        </h1>
        <p
          className="text-sm sm:text-base md:text-[17px] leading-[1.7] max-w-[520px] text-text-mid"
          style={{ opacity: 0, animation: "fadeUp 0.7s ease forwards 0.5s" }}
        >
          Articole despre arhitectură software, AI, antreprenoriat tehnic și tot ce înseamnă să construiești produse digitale serioase.
        </p>
      </div>

      {/* Filters */}
      <div
        ref={(el) => { revealRefs.current[1] = el; }}
        className="reveal max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 pb-8 sm:pb-12 md:pb-14 relative z-10"
      >
        <div className="flex gap-2 flex-wrap items-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase px-3 sm:px-4 py-2 transition-all duration-200 border border-border"
              style={{
                color: filter === cat.id ? "var(--accent)" : "var(--text-muted)",
                background: filter === cat.id ? "rgba(0,229,255,0.05)" : "transparent",
              }}
            >
              {cat.label}
            </button>
          ))}
          <span className="font-mono text-[10px] sm:text-[11px] ml-auto text-text-muted">
            {filteredPosts.length} articol{filteredPosts.length === 1 ? "" : "e"}
          </span>
        </div>
      </div>

      {/* Blog Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 pb-[60px] sm:pb-[80px] md:pb-[120px] relative z-10">
        {/* Featured Post */}
        {featured && (
          <a
            href={`/blog/${featured.slug}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-px transition-all duration-300 relative overflow-hidden bg-surface border border-border hover:border-accent/50"
          >
            <div className="relative overflow-hidden flex items-center justify-center min-h-[200px] sm:min-h-[280px] md:min-h-[340px] bg-surface lg:border-r lg:border-border">
              <TerminalVisual />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)",
                }}
              />
            </div>
            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-colors duration-300 bg-surface min-h-[200px] sm:min-h-[280px] md:min-h-[340px] hover:bg-surface2">
              <div>
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-accent">
                    Featured · {featured.tags[0] || "Articol"}
                  </span>
                </div>
                <h2 className="font-extrabold leading-[1.1] tracking-[-0.02em] mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-[clamp(22px,3vw,32px)]">
                  {featured.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7] mb-5 sm:mb-8 text-text-mid">
                  {featured.excerpt}
                </p>
              </div>
              <div>
                <div className="flex gap-2 mb-4 sm:mb-5 flex-wrap">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1 text-text-muted border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 border-t border-border">
                  <span className="font-mono text-[10px] sm:text-[11px] text-text-muted">
                    Dionix Team
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-text-muted">
                    {new Date(featured.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] ml-auto text-accent">
                    8 min →
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Grid Posts */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-px bg-border border border-border">
            {gridPosts.map((post, idx) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex flex-col relative transition-colors duration-300 group bg-surface hover:bg-surface2"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-accent" />
                <div className="h-[120px] sm:h-[150px] md:h-[180px] relative overflow-hidden bg-surface2 border-b border-border">
                  <LineVisual pattern={visualLines[idx % visualLines.length]} />
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-3 sm:mb-4 text-accent">
                    {post.tags[0] || "Development"}
                  </div>
                  <h3 className="font-bold text-[15px] sm:text-[16px] md:text-[17px] leading-[1.3] tracking-[-0.01em] mb-2 sm:mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] leading-[1.6] mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 text-text-mid">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-mono text-[9px] sm:text-[10px] text-text-muted">
                      {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-accent">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div
          ref={(el) => { revealRefs.current[2] = el; }}
          className="reveal mt-12 sm:mt-16 md:mt-20 p-6 sm:p-10 md:p-16 text-center relative overflow-hidden bg-surface border border-border"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[200px] sm:h-[250px] md:h-[300px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-3 sm:mb-4 text-accent">
            {"// subscribe()"}
          </div>
          <h3 className="text-xl sm:text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] mb-2 sm:mb-3">Articole noi, direct în inbox.</h3>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] mb-6 sm:mb-9 text-text-mid">
            Publicăm 1–2 articole pe lună. Fără spam, fără oferte.
          </p>
          {subscribed ? (
            <p className="font-mono text-[12px] sm:text-[13px] text-green-500 tracking-[0.05em]">
              ✓ Ești abonat! Mulțumim.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@firma.ro"
                className="flex-1 px-4 py-3 sm:py-3.5 font-mono text-[12px] sm:text-[13px] outline-none transition-colors duration-200 bg-bg border border-border text-text"
              />
              <button
                type="submit"
                className="px-5 sm:px-7 py-3 sm:py-3.5 font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200 bg-accent text-bg"
              >
                Abonează-te
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
