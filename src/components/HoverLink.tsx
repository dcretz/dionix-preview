"use client";

import Link from "next/link";

interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "filled" | "outline";
  target?: string;
  rel?: string;
}

export function HoverLink({
  href,
  children,
  className = "",
  style = {},
  variant = "filled",
  target,
  rel,
}: HoverLinkProps) {
  const isExternal = href.startsWith("http");

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (variant === "filled") {
      el.style.background = "transparent";
      el.style.color = "var(--accent)";
      el.style.outline = "1px solid var(--accent)";
    } else {
      el.style.background = "var(--accent)";
      el.style.color = "var(--bg)";
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    if (variant === "filled") {
      el.style.background = "var(--accent)";
      el.style.color = "var(--bg)";
      el.style.outline = "none";
    } else {
      el.style.background = "transparent";
      el.style.color = "var(--accent)";
    }
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={className}
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={style}
      target={target}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </Link>
  );
}

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverCard({ children, className = "", style = {} }: HoverCardProps) {
  return (
    <div
      className={className}
      style={style}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {children}
    </div>
  );
}
