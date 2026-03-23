"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    const prefs = {
      ...preferences,
      necessary: true,
    };
    setPreferences(prefs);
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (key: keyof Omit<CookiePreferences, "necessary">) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[999]" onClick={() => setShowBanner(false)} />
      
      <div className="fixed bottom-0 left-0 right-0 z-[1000] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto bg-surface border border-border rounded-lg shadow-2xl overflow-hidden">
          {!showPreferences ? (
            <>
              {/* Main Banner */}
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🍪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-text mb-2">
                      Folosim Cookies
                    </h2>
                    <p className="text-[13px] sm:text-[14px] text-text-mid leading-relaxed mb-4">
                      Folosim cookies pentru a-ți oferi o experiență mai bună pe site-ul nostru. 
                      Acceptând cookies, ne ajuți să îmbunătățim serviciile noastre.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Link 
                        href="/legal/gdpr" 
                        className="text-[11px] sm:text-[12px] text-accent hover:underline"
                      >
                        Citește politica completă →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex-1 py-3 px-4 font-mono text-[12px] sm:text-[13px] tracking-wider uppercase border border-border text-text-mid hover:border-accent hover:text-accent transition-all duration-200"
                >
                  Preferințe
                </button>
                <button
                  onClick={handleAcceptEssential}
                  className="flex-1 py-3 px-4 font-mono text-[12px] sm:text-[13px] tracking-wider uppercase border border-border text-text-mid hover:border-text hover:text-text transition-all duration-200"
                >
                  Doar Esențiale
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 py-3 px-4 font-mono text-[12px] sm:text-[13px] font-bold tracking-wider uppercase bg-accent text-bg hover:bg-accent/90 transition-all duration-200"
                >
                  Acceptă Toate
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Preferences Panel */}
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-text">
                    Preferințe Cookies
                  </h2>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                  >
                    ←
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary */}
                  <div className="p-4 bg-surface2 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-text text-[14px] sm:text-[15px]">Cookies Esențiale</h3>
                        <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">
                          Necesare pentru funcționarea site-ului. Nu pot fi dezactivate.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-accent/30 rounded-full relative flex items-center justify-end px-1">
                        <div className="w-5 h-5 bg-accent rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 bg-surface2 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-text text-[14px] sm:text-[15px]">Cookies Analitice</h3>
                        <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">
                          Ne ajută să înțelegem cum folosești site-ul pentru a-l îmbunătăți.
                        </p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange("analytics")}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-200 px-1 flex items-center ${
                          preferences.analytics ? "bg-accent justify-end" : "bg-border justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full" />
                      </button>
                    </div>
                  </div>

                  {/* Functional */}
                  <div className="p-4 bg-surface2 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-text text-[14px] sm:text-[15px]">Cookies Funcționale</h3>
                        <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">
                          Permit funcții avansate precum preferințe și chat.
                        </p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange("functional")}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-200 px-1 flex items-center ${
                          preferences.functional ? "bg-accent justify-end" : "bg-border justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptEssential}
                  className="flex-1 py-3 px-4 font-mono text-[12px] sm:text-[13px] tracking-wider uppercase border border-border text-text-mid hover:border-accent hover:text-accent transition-all duration-200"
                >
                  Respinge Toate
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 py-3 px-4 font-mono text-[12px] sm:text-[13px] font-bold tracking-wider uppercase bg-accent text-bg hover:bg-accent/90 transition-all duration-200"
                >
                  Salvează Preferințe
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
