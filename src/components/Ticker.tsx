"use client";

const items = [
  "Aplicații Web Custom",
  "Platforme SaaS",
  "Automatizări AI",
  "Samsung TV Apps",
  "Trading Bots",
  "E-commerce",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative z-10 border-t border-b border-border py-4">
      <div className="ticker-animate flex w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs tracking-widest uppercase px-10 whitespace-nowrap text-text-muted"
          >
            <span className="text-accent mr-2">→</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
