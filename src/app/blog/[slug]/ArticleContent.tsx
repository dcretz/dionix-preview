"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogBlock } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      if (!block.content) return <div className="mb-5 sm:mb-7" />;
      return (
        <p className="font-serif text-[15px] sm:text-[16px] md:text-[18px] leading-[1.8] mb-5 sm:mb-7 text-text-mid">
          {block.content}
        </p>
      );

    case "heading":
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      if (block.level === 2) {
        return (
          <h2
            data-num={block.content.match(/^\d+\./)?.[0]}
            className="font-sans text-xl sm:text-2xl md:text-[26px] font-extrabold tracking-[-0.02em] mt-10 sm:mt-12 md:mt-14 mb-4 sm:mb-5 text-text"
          >
            {block.content}
          </h2>
        );
      }
      return (
        <Tag className="font-sans text-base sm:text-lg font-bold mt-8 sm:mt-9 mb-3 sm:mb-4 text-text">
          {block.content}
        </Tag>
      );

    case "bullet":
      return (
        <div className="flex gap-3 mb-3">
          <span className="flex-shrink-0 mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-accent font-mono">
            →
          </span>
          <p className="font-serif text-[14px] sm:text-[15px] md:text-[17px] leading-[1.8] text-text-mid">
            {block.content}
          </p>
        </div>
      );

    case "numbered":
      return (
        <div className="flex gap-3 mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] flex-shrink-0 mt-1 sm:mt-1 text-accent">
            →
          </span>
          <p className="font-serif text-[14px] sm:text-[15px] md:text-[17px] leading-[1.8] text-text-mid">
            {block.content}
          </p>
        </div>
      );

    case "code":
      return (
        <pre
          className="my-7 sm:my-9 p-4 sm:p-6 md:p-7 overflow-x-auto relative bg-surface border border-border font-mono text-[11px] sm:text-[12px] md:text-[13px] leading-[1.8] text-text-mid rounded-lg"
        >
          {block.language && (
            <span className="absolute top-2 sm:top-3 right-3 sm:right-4 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-text-muted">
              {block.language}
            </span>
          )}
          <code>{block.content}</code>
        </pre>
      );

    case "quote":
      return (
        <blockquote className="my-7 sm:my-9 pl-4 sm:pl-6 py-2 border-l-2 border-accent">
          <p className="text-[15px] sm:text-base md:text-lg italic leading-[1.8] text-text-mid">
            &ldquo;{block.content}&rdquo;
          </p>
        </blockquote>
      );

    case "divider":
      return (
        <div className="flex items-center gap-4 my-10 sm:my-12 md:my-14">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] sm:text-[11px] text-text-muted">
            * * *
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
      );

    case "image":
      return (
        <figure className="my-8 sm:my-10">
          <Image
            src={block.content}
            alt={block.caption || ""}
            width={800}
            height={450}
            className="w-full object-cover border border-border rounded-lg"
          />
          {block.caption && (
            <figcaption className="font-mono text-[10px] sm:text-xs text-center mt-2 sm:mt-3 text-text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div className="my-7 sm:my-9 p-5 sm:p-6 border-l-2 border-accent bg-accent/5 rounded-lg">
          <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-2 sm:mb-2.5 text-accent">
            {"// notă importantă"}
          </div>
          <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7] text-text-mid font-sans">
            {block.content}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default function ArticleContent({
  post,
  relatedPosts,
}: {
  post: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    tags: string[];
    blocks: BlogBlock[];
    category: string;
  };
  relatedPosts: Array<{
    title: string;
    slug: string;
    tags: string[];
    date: string;
  }>;
}) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((scrolled / total) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-bg text-text min-h-screen">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[200] transition-all duration-100 bg-accent"
        style={{ width: `${progress}%` }}
      />

      <Navbar />

      {/* Article Header */}
      <header
        className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 pt-[100px] sm:pt-[120px] md:pt-[140px] pb-12 sm:pb-16 md:pb-20 relative z-10"
        style={{ opacity: 0, animation: "fadeUp 0.6s ease forwards 0.1s" }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 mb-6 sm:mb-8 font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-text-muted flex-wrap"
          style={{ opacity: 0, animation: "fadeUp 0.5s ease forwards 0.1s" }}
        >
          <Link href="/" className="hover:text-accent transition-colors duration-200">Acasă</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent transition-colors duration-200">Blog</Link>
          <span>/</span>
          <span className="truncate max-w-[120px] sm:max-w-none">{post.category}</span>
        </div>

        {/* Category */}
        <div
          className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-accent"
          style={{ opacity: 0, animation: "fadeUp 0.5s ease forwards 0.2s" }}
        >
          <span className="w-4 sm:w-5 h-px bg-accent" />
          {post.category}
        </div>

        {/* Title */}
        <h1
          className="font-extrabold leading-[1.05] tracking-[-0.03em] mb-4 sm:mb-7 text-2xl sm:text-3xl md:text-4xl lg:text-[clamp(32px,5vw,56px)]"
          style={{ opacity: 0, animation: "fadeUp 0.7s ease forwards 0.3s" }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-start gap-4 sm:gap-6 py-4 sm:py-6 my-4 sm:my-6"
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            opacity: 0,
            animation: "fadeUp 0.6s ease forwards 0.5s",
          }}
        >
          {/* Author */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold bg-surface2 border border-border text-accent">
              DS
            </div>
            <div>
              <div className="text-[12px] sm:text-[13px] font-semibold">Dionix Team</div>
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] text-text-muted">
                Full-Stack & AI
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-border" />

          {/* Date */}
          <div className="font-mono text-[10px] sm:text-[11px] text-text-muted">
            <span className="block text-[9px] sm:text-[10px] tracking-[0.1em] uppercase mb-0.5 text-text-mid">
              Publicat
            </span>
            {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
          </div>

          <div className="hidden sm:block w-px h-8 bg-border" />

          {/* Read time */}
          <div className="font-mono text-[10px] sm:text-[11px] text-text-muted">
            <span className="block text-[9px] sm:text-[10px] tracking-[0.1em] uppercase mb-0.5 text-text-mid">
              Timp lectură
            </span>
            8 minute
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap w-full sm:w-auto sm:ml-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-mono text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1 text-text-muted border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 relative z-10">
        {post.blocks.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="font-mono text-[12px] sm:text-sm text-text-muted">
              Conținutul articolului nu a putut fi încărcat.
            </p>
          </div>
        ) : (
          post.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))
        )}
      </article>

      {/* Article Footer */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 relative z-10">
        {/* Share Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 py-4 sm:py-6 border-t border-b border-border">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-text-muted mr-1 sm:mr-2">
            Distribuie
          </span>
          <button
            onClick={copyLink}
            className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border transition-all duration-200 bg-transparent"
            style={{
              color: copied ? "#4ade80" : "var(--text-muted)",
              borderColor: copied ? "#4ade80" : "var(--border)",
            }}
          >
            {copied ? "✓ Copiat!" : "Copiază link"}
          </button>
          <a href="#" className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border transition-all duration-200 text-text-muted border-border hover:border-accent hover:text-accent">
            LinkedIn
          </a>
          <a href="#" className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border transition-all duration-200 text-text-muted border-border hover:border-accent hover:text-accent">
            Twitter / X
          </a>
          <span className="font-mono text-[10px] sm:text-[11px] ml-auto text-text-muted">
            8 min
          </span>
        </div>

        {/* Author Card */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 items-start p-6 sm:p-8 md:p-9 mt-8 sm:mt-12 bg-surface border border-border">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-mono text-base sm:text-lg flex-shrink-0 bg-surface2 border border-border text-accent">
            DS
          </div>
          <div>
            <div className="text-[14px] sm:text-[15px] md:text-[16px] font-bold mb-1">Dionix Softworks</div>
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] mb-2 sm:mb-3 text-accent">
              Full-Stack & AI Development · București
            </div>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-text-mid">
              Construim aplicații web custom, platforme SaaS și automatizări AI. Scriem despre ce învățăm pe parcurs — fără hype, cu cod real.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12 pb-[60px] sm:pb-[80px] md:pb-[120px] relative z-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-[13px] sm:text-[14px] font-bold tracking-[-0.01em]">Articole similare</h3>
            <Link href="/blog" className="font-mono text-[10px] sm:text-[11px] text-accent no-underline hover:underline">
              Vezi toate →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-border border border-border">
            {relatedPosts.slice(0, 2).map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="block p-5 sm:p-7 transition-colors duration-200 bg-surface hover:bg-surface2"
              >
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase mb-2 sm:mb-2.5 text-accent">
                  {related.tags[0] || "Development"}
                </div>
                <div className="text-[14px] sm:text-[15px] font-bold leading-[1.3] tracking-[-0.01em] mb-2 sm:mb-3">
                  {related.title}
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] text-text-muted">
                  8 min citire
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
