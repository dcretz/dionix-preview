# Dionix Softworks — Next.js 14

Site-ul oficial Dionix Softworks, construit cu Next.js 14, TypeScript și Tailwind CSS.

## Requirements

- Node.js >= 18.17.0 (recomandat v20.20.0)
- npm >= 9.x (recomandat 9.2.0)

## Setup

```bash
# Instalează dependențele
npm install

# Rulează în development
npm run dev

# Build pentru producție
npm run build

# Pornește în producție
npm start
```

Aplicația va rula la `http://localhost:3000`

## Structură

```
src/
├── app/
│   ├── layout.tsx          # Root layout cu fonturi
│   ├── page.tsx            # Homepage principal
│   ├── globals.css         # Stiluri globale + design system
│   ├── not-found.tsx       # Pagina 404
│   ├── funnel/
│   │   ├── layout.tsx
│   │   └── page.tsx        # Funnel "Site în 1 oră" (/funnel)
│   └── order/
│       └── page.tsx        # Formular detaliat (/order)
├── components/
│   ├── Cursor.tsx          # Custom cursor animat
│   ├── Navbar.tsx          # Navigație sticky
│   ├── Hero.tsx            # Secțiunea hero cu terminal
│   ├── Terminal.tsx        # Typewriter terminal
│   ├── Ticker.tsx          # Ticker scrolling
│   ├── Services.tsx        # Secțiunea servicii
│   ├── Portfolio.tsx       # Portofoliu proiecte
│   ├── Pricing.tsx         # Pachete și prețuri
│   ├── ProcessAndWhy.tsx   # Proces + De ce noi
│   ├── CTA.tsx             # Call to action final
│   ├── Footer.tsx          # Footer cu date legale
│   └── RevealWrapper.tsx   # Wrapper pentru scroll reveal
└── lib/
    └── useReveal.ts        # Hook pentru animații scroll
```

## Pagini

| URL | Descriere |
|-----|-----------|
| `/` | Homepage principal |
| `/website-in-1-ora` | Landing page "Site în 1 oră" |

## Design System

Variabilele CSS sunt definite în `globals.css`:

Fonturi: `Space Mono` (mono) + `Syne` (sans)

## Deploy pe Vercel

```bash
npm install 
```

## Date de contact

- Email: contact@dionixsoftworks.ro