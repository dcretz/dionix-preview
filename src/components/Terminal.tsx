"use client";

import { useEffect, useRef, useState } from "react";

interface TermLine {
  delay: number;
  type: "cmd" | "dim" | "check" | "green" | "cursor";
  text?: string;
  gap?: boolean;
}

const termLines: TermLine[] = [
  { delay: 300, type: "cmd", text: "npm init dionix-project" },
  { delay: 1400, type: "dim", text: "Initializing new project..." },
  { delay: 2000, type: "check", text: "React + TypeScript" },
  { delay: 2400, type: "check", text: "Tailwind CSS + Node.js" },
  { delay: 2800, type: "check", text: "PostgreSQL + Redis" },
  { delay: 3200, type: "check", text: "AI integrations ready" },
  { delay: 3900, type: "cmd", text: "git push origin main", gap: true },
  { delay: 4900, type: "dim", text: "Deploying to production..." },
  { delay: 5700, type: "green", text: "🚀 Live at https://client.dionixsoftworks.ro" },
  { delay: 6300, type: "cursor", gap: true },
];

interface LineState {
  type: TermLine["type"];
  text: string;
  visible: boolean;
  gap?: boolean;
}

function typeWriter(
  setText: (t: string) => void,
  text: string,
  speed: number
): void {
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      setText(text.slice(0, i + 1));
      i++;
      setTimeout(tick, speed + Math.random() * 30);
    }
  };
  tick();
}

export default function Terminal() {
  const [lines, setLines] = useState<LineState[]>([]);
  const [typedTexts, setTypedTexts] = useState<Record<number, string>>({});
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          runTerminal();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const runTerminal = () => {
    termLines.forEach((line, idx) => {
      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: line.type, text: line.text || "", visible: true, gap: line.gap },
        ]);
        if (line.type === "cmd" || line.type === "check" || line.type === "green") {
          const speed = line.type === "cmd" ? 45 : line.type === "check" ? 35 : 30;
          typeWriter(
            (t) => setTypedTexts((prev) => ({ ...prev, [idx]: t })),
            line.text || "",
            speed
          );
        }
      }, line.delay);
    });
  };

  return (
    <div ref={ref} className="terminal-wrap opacity-0 fade-up-4">
      <div className="rounded-lg overflow-hidden font-mono bg-surface border border-border shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,229,255,0.05)]">
        {/* Header */}
        <div className="flex items-center px-4 py-3 gap-1.5 bg-[#161B22] border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/40">
            dionix@softworks: ~/projects
          </span>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-1.5 min-h-[280px]">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={`flex items-baseline gap-2 text-sm leading-relaxed t-line show ${line.gap ? "mt-3" : ""}`}
            >
              {line.type === "cmd" && (
                <>
                  <span className="t-prompt flex-shrink-0 text-accent font-bold">$</span>
                  <span className="text-white/85">{typedTexts[idx] || ""}</span>
                </>
              )}
              {line.type === "check" && (
                <>
                  <span className="flex-shrink-0 text-green-500 font-bold">✓</span>
                  <span className="text-white/60">{typedTexts[idx] || ""}</span>
                </>
              )}
              {line.type === "green" && (
                <span className="text-green-500">{typedTexts[idx] || ""}</span>
              )}
              {line.type === "dim" && (
                <span className="text-white/35">{line.text}</span>
              )}
              {line.type === "cursor" && (
                <>
                  <span className="text-accent font-bold">$</span>
                  <span className="t-blink">_</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
