"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#servicii", label: "Servicii" },
  { href: "/#portofoliu", label: "Portofoliu" },
  { href: "/#preturi", label: "Prețuri" },
  { href: "/#proces", label: "Proces" },
  { href: "/#despre", label: "Despre" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-12 py-5 transition-all duration-300 ${scrolled ? "border-b border-border bg-bg/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}
    >
      <Link
        href="/"
        className="font-mono text-sm tracking-wider text-text"
      >
        Dionix<span className="text-accent">.</span>Softworks
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent text-text-muted"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:bg-accent text-accent border border-accent"
      >
        Discutăm
      </Link>
    </nav>
  );
}
