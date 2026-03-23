"use client";

import { useState, useEffect } from "react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; message?: string; submit?: string }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const e: { email?: string; message?: string } = {};
    if (!email.trim()) {
      e.email = "Adresa de email este obligatorie";
    } else if (!email.includes("@") || !email.includes(".")) {
      e.email = "Introdu o adresă de email validă";
    }
    if (!message.trim()) {
      e.message = "Mesajul este obligatoriu";
    } else if (message.trim().length < 10) {
      e.message = "Mesajul trebuie să aibă cel puțin 10 caractere";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          source: "Contact Modal",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || "Eroare la trimitere. Te rugăm să încerci din nou." });
      }
    } catch (error) {
      setErrors({ submit: "Eroare de conexiune. Te rugăm să încerci din nou." });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg bg-surface border border-border">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center font-mono text-lg transition-colors duration-200 text-text-muted hover:text-accent"
        >
          +
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-border">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2 inline-flex items-center gap-2 px-3 py-1.5 text-accent bg-accent/10 border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Contact rapid
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] mt-3 mb-1">
                Te contactăm noi
              </h3>
              <p className="font-mono text-[11px] text-text-muted">
                Completează datele tale și te sunăm în maximum 24 de ore.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6">
              <div className="mb-5">
                <label className="block font-mono text-[10px] tracking-[0.12em] uppercase mb-2 text-text-muted">
                  Adresa de email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@firma-ta.ro"
                  className="w-full px-4 py-3 text-sm font-sans outline-none transition-colors duration-200 bg-bg border text-text"
                  style={{ borderColor: errors.email ? "#FF4D4D" : "var(--border)" }}
                />
                {errors.email && (
                  <p className="font-mono text-[10px] mt-1 text-[#FF4D4D]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block font-mono text-[10px] tracking-[0.12em] uppercase mb-2 text-text-muted">
                  Ce proiect ai în vedere? <span className="text-accent">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Spune-ne pe scurt despre proiectul tău, ce buget ai și care este termenul dorit..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm font-sans outline-none transition-colors duration-200 resize-none bg-bg border text-text"
                  style={{ borderColor: errors.message ? "#FF4D4D" : "var(--border)" }}
                />
                {errors.message && (
                  <p className="font-mono text-[10px] mt-1 text-[#FF4D4D]">
                    {errors.message}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="font-mono text-[11px] text-red-500">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-200 bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Se trimite..." : "Trimite →"}
              </button>

              <p className="font-mono text-[10px] text-center mt-4 text-text-muted">
                Primesti răspuns în max 24 de ore · Fără spam
              </p>
            </form>
          </>
        ) : (
          /* Success */
          <div className="px-6 sm:px-8 py-12 text-center">
            <div className="text-5xl mb-5">🎉</div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] mb-3">
              Mesajul a fost{" "}
              <span className="text-accent">trimis!</span>
            </h3>
            <p className="font-mono text-[11px] leading-relaxed mb-6 text-text-muted">
              Îți mulțumim pentru interes. Un membru al echipei Dionix te va
              contacta în maximum 24 de ore.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-200 bg-transparent text-text-muted border border-border hover:border-accent hover:text-accent"
            >
              Închide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
