import { NextResponse } from "next/server";
import { createLead, checkDuplicate } from "@/lib/notion";
// import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs/promises";
import * as path from "path";
import { headers } from "next/headers";

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY!,
// });

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  description: string;
  website?: string;
  pages: string[];
  extra?: string;
  color: string;
  style: string;
  pkg?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function generateSlug(company: string): string {
  return company
    .toLowerCase()
    .replace(/\s+srl|\s+sa|\s+sas|\./gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .substring(0, 28);
}

function getClientIp(headersList: Headers): string {
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

// ─── MAILTRAP ────────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://send.api.mailtrap.io/api/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MAILTRAP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: "preview@dionixsoftworks.ro", name: "Dionix Softworks" },
      to: [{ email: to }],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Mailtrap error:", err);
    throw new Error("Email send failed");
  }
}

// ─── EMAIL TEMPLATES ─────────────────────────────────────────────────────────

function emailOnTheWay(firmName: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#080C10;font-family:'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
  <div style="margin-bottom:32px;">
    <span style="font-family:monospace;font-size:16px;color:#fff;letter-spacing:2px;">
      DIONIX<span style="color:#00E5FF;">.</span>SOFTWORKS
    </span>
  </div>
  <div style="background:#0D1117;border:1px solid #1E2733;padding:48px 40px;margin-bottom:16px;">
    <div style="font-family:monospace;font-size:11px;color:#00E5FF;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;">
      ● Cerere primită
    </div>
    <h1 style="font-size:26px;font-weight:800;color:#E8EDF2;margin:0 0 16px;line-height:1.3;">
      Lucrăm la site-ul<br>
      <span style="color:#00E5FF;">${firmName}</span>
    </h1>
    <p style="font-size:15px;color:#8A9BAB;line-height:1.7;margin:0 0 32px;">
      Am primit cererea ta și echipa noastră a început imediat să lucreze.
      Vei primi un link cu preview-ul site-ului tău în mai puțin de
      <strong style="color:#E8EDF2;">60 de minute</strong>.
    </p>
    <div style="background:#080C10;border:1px solid #1E2733;padding:20px 24px;">
      <div style="font-family:monospace;font-size:10px;color:#00E5FF;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Ce se întâmplă acum</div>
      <div style="font-family:monospace;font-size:12px;color:#8A9BAB;line-height:2.2;">
        ● Analizăm <span style="color:#E8EDF2;">site-ul și industria ta</span><br>
        ● Construim <span style="color:#E8EDF2;">fișa completă a proiectului</span><br>
        ● Generăm <span style="color:#E8EDF2;">design-ul personalizat</span><br>
        ● Publicăm preview-ul pe <span style="color:#E8EDF2;">domeniu propriu</span>
      </div>
    </div>
  </div>
  <div style="text-align:center;padding-top:20px;">
    <p style="font-family:monospace;font-size:11px;color:#5A6A7A;margin:0;">
      Întrebări? <a href="mailto:contact@dionixsoftworks.ro" style="color:#00E5FF;text-decoration:none;">contact@dionixsoftworks.ro</a>
    </p>
  </div>
</div>
</body></html>`;
}

function emailPreviewReady(firmName: string, previewUrl: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#080C10;font-family:'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
  <div style="margin-bottom:32px;">
    <span style="font-family:monospace;font-size:16px;color:#fff;letter-spacing:2px;">
      DIONIX<span style="color:#00E5FF;">.</span>SOFTWORKS
    </span>
  </div>
  <div style="background:#0D1117;border:1px solid #1E2733;padding:48px 40px;margin-bottom:16px;">
    <div style="font-family:monospace;font-size:11px;color:#4ADE80;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;">
      ● Preview gata
    </div>
    <h1 style="font-size:26px;font-weight:800;color:#E8EDF2;margin:0 0 16px;line-height:1.3;">
      Site-ul <span style="color:#00E5FF;">${firmName}</span><br>este live!
    </h1>
    <p style="font-size:15px;color:#8A9BAB;line-height:1.7;margin:0 0 32px;">
      Am construit un preview real al site-ului tău.
      Funcționează pe telefon, tabletă și desktop.
    </p>
    <a href="${previewUrl}"
       style="display:inline-block;background:#00E5FF;color:#080C10;font-family:monospace;
              font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase;
              padding:16px 36px;text-decoration:none;margin-bottom:24px;">
      Deschide preview-ul →
    </a>
    <div style="font-family:monospace;font-size:12px;color:#5A6A7A;padding:14px 18px;
                background:#080C10;border:1px solid #1E2733;word-break:break-all;margin-bottom:24px;">
      ${previewUrl}
    </div>
    <div style="background:#080C10;border:1px solid #1E2733;padding:20px 24px;">
      <div style="font-family:monospace;font-size:10px;color:#00E5FF;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Ce urmează</div>
      <div style="font-family:monospace;font-size:12px;color:#8A9BAB;line-height:2.2;">
        ● Link activ <span style="color:#E8EDF2;">48 de ore</span><br>
        ● Dacă îți place, te contactăm pentru <span style="color:#E8EDF2;">finalizare</span><br>
        ● Plătești doar dacă <span style="color:#E8EDF2;">continui</span><br>
        ● Site final pe domeniul tău în <span style="color:#E8EDF2;">7 zile</span>
      </div>
    </div>
  </div>
  <div style="text-align:center;padding-top:20px;">
    <p style="font-family:monospace;font-size:11px;color:#5A6A7A;margin:0;">
      Întrebări? <a href="mailto:contact@dionixsoftworks.ro" style="color:#00E5FF;text-decoration:none;">contact@dionixsoftworks.ro</a>
    </p>
  </div>
</div>
</body></html>`;
}

// ─── CLAUDE: FIȘA CLIENTULUI ─────────────────────────────────────────────────

// async function generateFisa(data: LeadData): Promise<string> {
//   const message = await anthropic.messages.create({
//     model: "claude-opus-4-5",
//     max_tokens: 2000,
//     messages: [{
//       role: "user",
//       content: `Creează o fișă de client concisă pentru o agenție de web design.

// Firma: ${data.company}
// Industrie: ${data.industry}
// Oraș: extras din descriere dacă există
// Descriere: ${data.description}
// Site actual: ${data.website || "Nu există"}
// Pagini dorite: ${data.pages.join(", ")}
// Stil preferat: ${data.style}
// Culori preferate: ${data.color}
// Extra: ${data.extra || "Nimic"}

// Fișa trebuie să conțină:
// 1. Rezumat firmă (2-3 propoziții)
// 2. Obiectivul site-ului nou
// 3. Pagini și funcționalități necesare
// 4. Ton și stil recomandat
// 5. 3 întrebări cheie pentru discovery call

// Răspunde concis, în română, fără formatare markdown excesivă.`,
//     }],
//   });

//   return message.content[0].type === "text" ? message.content[0].text : "";
// }

// // ─── CLAUDE: MOCKUP HTML ─────────────────────────────────────────────────────

// const MOCKUP_SYSTEM = `You are an expert web designer. Generate complete, self-contained HTML preview websites for Romanian businesses.

// RULES:
// - Output ONLY raw HTML. No explanations, no markdown, no code blocks.
// - Single HTML file with all CSS in <style> tags. Zero external CSS/JS dependencies.
// - Minimal vanilla JS only for mobile menu and scroll effects.
// - Images: use https://images.unsplash.com/photo-ID?w=1200&q=80 relevant to industry, or from websites if website exists.
// - All text in Romanian. Mobile-responsive with CSS flexbox/grid only.
// - Must look like a real professional website, not a mockup.

// COLOR PALETTES:
// - dark: bg=#080C10, surface=#0D1117, accent=#00E5FF, text=#E8EDF2
// - white: bg=#ffffff, surface=#f7f7f7, accent=#1a1a1a, text=#1a1a1a
// - warm: bg=#faf8f4, surface=#f0ede6, accent=#b5a06a, text=#2a2015
// - blue: bg=#f8faff, surface=#eff6ff, accent=#1e40af, text=#0f172a
// - creative: bg=#fafafa, surface=#f3f0ff, accent=#7c3aed, text=#1a1a2e
// - green: bg=#f7fdf9, surface=#f0fdf4, accent=#16a34a, text=#052e16

// INDUSTRY UNSPLASH QUERIES:
// - architecture/design: use photo-1618221195710-dd6b41faaea6 (interior design)
// - medical: use photo-1631217868264-e5b90bb7e133 (medical)
// - restaurant/food: use photo-1517248135467-4c7edcad34c4 (restaurant)
// - beauty/salon: use photo-1560066984-138dadb4c035 (salon)
// - construction: use photo-1504307651254-35680f356dfd (construction)
// - technology: use photo-1518770660439-4636190af475 (tech)
// - generic: use photo-1497366216548-37526070297c (office)

// MANDATORY STRUCTURE:
// 1. head with SEO meta tags, title includes city
// 2. sticky nav: logo + links + CTA button
// 3. hero: full-height, headline + subheadline + 2 CTAs + image
// 4. services: grid of 3-6 cards based on industry
// 5. about: split layout with image
// 6. process: 4 steps
// 7. contact: form + details
// 8. footer with copyright 2026`;

// async function generateMockup(data: LeadData, fisa: string): Promise<string> {
//   const message = await anthropic.messages.create({
//     model: "claude-opus-4-5",
//     max_tokens: 8192,
//     system: MOCKUP_SYSTEM,
//     messages: [{
//       role: "user",
//       content: `Generate a complete website preview for:

// Company: ${data.company}
// Industry: ${data.industry}
// Description: ${data.description}
// Pages requested: ${data.pages.join(", ")}
// Color palette: ${data.color}
// Style: ${data.style}
// Extra features: ${data.extra || "none"}
// Website analysis: ${fisa.substring(0, 500)}

// SEO title: "${data.company} — ${data.industry}"
// Output: ONLY the complete HTML file.`,
//     }],
//   });

//   const text = message.content[0].type === "text" ? message.content[0].text : "";

//   // Curăță dacă Claude a adăugat markdown code blocks
//   return text
//     .replace(/^```html\n?/i, "")
//     .replace(/^```\n?/, "")
//     .replace(/\n?```$/, "")
//     .trim();
// }

// ─── BACKGROUND PROCESSOR ────────────────────────────────────────────────────

// async function processPreview(data: LeadData, slug: string): Promise<void> {
//   const previewUrl = `https://${slug}.dionixsoftworks.ro`;

//   try {
//     // PASUL 1 — Email inițial
//     await sendEmail(
//       data.email,
//       `Lucrăm la site-ul ${data.company}!`,
//       emailOnTheWay(data.company)
//     );
//     console.log(`[${slug}] ✓ Email inițial trimis`);

//     // PASUL 2 — Fișa clientului
//     const fisa = await generateFisa(data);
//     console.log(`[${slug}] ✓ Fișă generată`);

//     // PASUL 3 — Mockup HTML
//     const html = await generateMockup(data, fisa);
//     console.log(`[${slug}] ✓ Mockup generat (${html.length} chars)`);

//     // PASUL 4 — Scrie pe server
//     const previewDir = path.join("/var/www/previews", slug);
//     await fs.mkdir(previewDir, { recursive: true });
//     await fs.writeFile(path.join(previewDir, "index.html"), html, "utf-8");

//     // Salvează și fișa pentru referință internă
//     await fs.writeFile(
//       path.join(previewDir, "fisa.txt"),
//       `${new Date().toISOString()}\n\n${fisa}`,
//       "utf-8"
//     );
//     console.log(`[${slug}] ✓ Fișiere scrise pe server`);

//     // PASUL 5 — Email final
//     await sendEmail(
//       data.email,
//       `Preview-ul site-ului ${data.company} este gata! 🚀`,
//       emailPreviewReady(data.company, previewUrl)
//     );
//     console.log(`[${slug}] ✓ Email final trimis → ${previewUrl}`);

//   } catch (error) {
//     console.error(`[${slug}] ✗ Eroare în procesare:`, error);

//     // Notifică intern în caz de eroare
//     await sendEmail(
//       "contact@dionixsoftworks.ro",
//       `[EROARE] Preview eșuat pentru ${data.company}`,
//       `<pre>${JSON.stringify({ slug, data, error: String(error) }, null, 2)}</pre>`
//     ).catch(() => {}); // Nu arunca eroare dacă și asta eșuează
//   }
// }

async function processPreview(data: LeadData, slug: string): Promise<void> {
  try {
    await sendEmail(
      data.email,
      `Lucrăm la site-ul ${data.company}!`,
      emailOnTheWay(data.company)
    );
    console.log(`[${slug}] ✓ Email inițial trimis`);

    await sendTelegram(
      `🚀 <b>Client nou!</b>\n\n` +
      `🏢 <b>Firmă:</b> ${data.company}\n` +
      `🏭 <b>Industrie:</b> ${data.industry}\n` +
      `📧 <b>Email:</b> ${data.email}\n` +
      `📱 <b>Telefon:</b> ${data.phone}\n` +
      `🌐 <b>Site actual:</b> ${data.website || "Nu există"}\n` +
      `🎨 <b>Stil:</b> ${data.style} / ${data.color}\n` +
      `📄 <b>Pagini:</b> ${data.pages.join(", ")}\n\n` +
      `🔗 https://${slug}.dionixsoftworks.ro`
    );

  } catch (error) {
    console.error(`[${slug}] ✗ Eroare:`, error);

    await sendTelegram(
      `⚠️ <b>Eroare preview!</b>\n\n` +
      `🏢 <b>Firmă:</b> ${data.company}\n` +
      `❌ <b>Eroare:</b> ${String(error)}`
    ).catch(() => {});
  }
}


async function sendTelegram(message: string): Promise<void> {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    }
  ).catch((err) => console.error("Telegram error:", err));
}



// ─── MAIN HANDLER ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const clientIp = getClientIp(headersList as unknown as Headers);
    const data: LeadData = await request.json();

    const {
      name, email, phone, company, industry, description,
      website, pages, extra, color, style, pkg,
    } = data;

    // ── Validare câmpuri obligatorii ──
    if (!name || !email || !phone || !company || !industry || !description) {
      return NextResponse.json(
        { error: "Câmpuri obligatorii lipsă." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Adresă de email invalidă." },
        { status: 400 }
      );
    }

    if (description.trim().length < 10) {
      return NextResponse.json(
        { error: "Descrierea este prea scurtă." },
        { status: 400 }
      );
    }


    // ── Verificare duplicate (anti-abuse) ──
    const duplicate = await checkDuplicate({
      email,
      company,
      ip: clientIp,
      website: website || "",
    });

    if (duplicate) {
      // Colectează toate informațiile relevante
      const duplicateInfo = {
        timestamp: new Date().toISOString(),
        type: 'DUPLICATE_ATTEMPT',
        data: data,
        endpoint: request.url,
        method: request.method,
        ip: request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown',
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        // Adaugă și alte informații relevante
        requestId: request.headers.get('x-request-id') || 'unknown',
      };
      
      // Log în consolă pentru monitorizare
      // console.warn(`[DUPLICATE] Client ${data.email} a încercat să folosească ${duplicateInfo.endpoint} de două ori`);
      
      // Salvează în fișier pentru audit
      const logDir = path.join(process.cwd(), 'logs');
      await fs.mkdir(logDir, { recursive: true });
      await fs.appendFile(
        path.join(logDir, 'duplicates.log'),
        JSON.stringify(duplicateInfo) + '\n'
      );
      
      // Opțional: trimite către un serviciu de monitorizare
      // await fetch('https://your-monitoring-service.com/log', {
      //   method: 'POST',
      //   body: JSON.stringify(duplicateInfo),
      // });
      
      return NextResponse.json(
        {
          error: "Acest serviciu poate fi folosit o singură dată per client. " +
                "Dacă ai nevoie de ajutor, contactează-ne la contact@dionixsoftworks.ro",
          code: "DUPLICATE",
        },
        { status: 429 }
      );
    }


    // ── Salvează în Notion ──
    await createLead({
      name,
      email,
      phone,
      company,
      industry,
      description,
      website,
      pages: pages || [],
      extra,
      color: color || "dark",
      style: style || "minimal",
      package: pkg,
      ip: clientIp,
    });


    const slug = generateSlug(company);
    const previewUrl = `https://${slug}.dionixsoftworks.ro`;

    // ── Pornește procesarea în background (non-blocking) ──
    processPreview(data, slug).catch((err) =>
      console.error("Background process error:", err)
    );

    // ── Răspuns imediat ──
    return NextResponse.json({
      success: true,
      status: "processing",
      slug,
      previewUrl,
      message: "Cererea ta a fost primită! Vei primi un email de confirmare în câteva momente.",
    });

  } catch (error) {
    console.error("Preview route error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare. Te rugăm să încerci din nou." },
      { status: 500 }
    );
  }
}
