"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { languageOptions, translations, type Language } from "@/lib/translations";

interface NavbarProps {
  currentView: "home" | "cotizador";
  setCurrentView: (view: "home" | "cotizador") => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

export default function Navbar({ currentView, setCurrentView, language, setLanguage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    const closeOnDesktop = () => {
      if (window.innerWidth >= 1280) setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeWithEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-zwol-black/90 px-4 py-3 backdrop-blur-md transition-all duration-300 dark:border-white/5 dark:bg-zwol-black/90 sm:px-6 sm:py-4 md:px-12 light:border-gray-200/20 light:bg-white/90">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => setCurrentView("home")} className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="https://oa7wcdk05oqhgv2n.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-27%20at%206.48.17%20PM.jpeg" alt="Logoo" className="border rounded-full" />
          </div>
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-white dark:text-white light:text-zwol-black uppercase">
            Zwol<span className="text-zwol-cyan">-</span>Home
          </span>
        </button>

        {currentView === "home" && (
          <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 xl:flex light:text-gray-600">
            <a href="#concepto" className="hover:text-zwol-cyan transition-colors">{t.concept}</a>
            <a href="#desafio" className="hover:text-zwol-cyan transition-colors">{t.challenge}</a>
            <a href="#ingenieria" className="hover:text-zwol-cyan transition-colors">{t.engineering}</a>
            <a href="#control" className="hover:text-zwol-cyan transition-colors">{t.control}</a>
            <a href="#ecosistema" className="hover:text-zwol-cyan transition-colors">{t.ecosystem}</a>
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-4">
          <label className="relative hidden sm:block">
            <span className="sr-only">{t.menuToggle}</span>
            <div className="group relative overflow-hidden rounded-full border border-zwol-cyan/30 bg-gradient-to-r from-white/5 via-slate-900/70 to-white/5 shadow-[0_0_18px_rgba(0,210,255,0.14)] backdrop-blur-sm transition-all duration-300 hover:border-zwol-cyan/70 hover:shadow-[0_0_24px_rgba(0,210,255,0.22)]">
              <select
                aria-label={t.menuToggle}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none cursor-pointer bg-transparent px-4 py-2.5 pr-10 text-[10px] font-mono uppercase tracking-[0.22em] text-white outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zwol-dark text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zwol-cyan">
                <ChevronDown aria-hidden="true" className="h-3 w-3" />
              </span>
            </div>
          </label>

          <button
            onClick={() => setCurrentView("cotizador")}
            className="hidden rounded-full bg-gradient-to-r from-zwol-cyan to-blue-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zwol-black transition-all hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] sm:inline-flex"
          >
            {t.startProject}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Cerrar menú" : t.menuToggle}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-zwol-cyan/50 hover:text-zwol-cyan focus:outline-none focus:ring-2 focus:ring-zwol-cyan/60 xl:hidden dark:text-white light:text-zwol-black"
          >
            {mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="absolute left-0 top-full max-h-[calc(100dvh-5rem)] w-full overflow-y-auto border-b border-white/10 bg-zwol-dark/95 px-4 py-5 font-mono text-xs uppercase tracking-widest text-gray-300 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-6 dark:border-white/10 dark:bg-zwol-dark/95 dark:text-gray-300 light:border-gray-200/20 light:bg-white/95 light:text-gray-700">
          <label className="relative block">
            <span className="sr-only">{t.menuToggle}</span>
            <div className="group relative overflow-hidden rounded-full border border-zwol-cyan/30 bg-gradient-to-r from-white/5 via-slate-900/70 to-white/5 shadow-[0_0_18px_rgba(0,210,255,0.14)] backdrop-blur-sm transition-all duration-300 hover:border-zwol-cyan/70 hover:shadow-[0_0_24px_rgba(0,210,255,0.22)]">
              <select
                aria-label={t.menuToggle}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full appearance-none cursor-pointer bg-transparent px-4 py-3 pr-10 text-[10px] font-mono uppercase tracking-[0.22em] text-white outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-zwol-dark text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zwol-cyan">
                <ChevronDown aria-hidden="true" className="h-3 w-3" />
              </span>
            </div>
          </label>
          <a href="#concepto" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-zwol-cyan">{t.concept}</a>
          <a href="#desafio" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-zwol-cyan">{t.challenge}</a>
          <a href="#ingenieria" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-zwol-cyan">{t.engineering}</a>
          <a href="#control" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-zwol-cyan">{t.control}</a>
          <a href="#ecosistema" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-zwol-cyan">{t.ecosystem}</a>
          <button
            onClick={() => { setCurrentView("cotizador"); setMobileMenuOpen(false); }}
            className="w-full text-center py-3 rounded-xl bg-zwol-cyan text-zwol-black font-bold uppercase"
          >
            {t.startProject}
          </button>
        </div>
      )}
    </nav>
  );
}