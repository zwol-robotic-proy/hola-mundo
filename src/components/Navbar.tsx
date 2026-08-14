"use client";

import { useState } from "react";
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

  return (
    <nav className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-300 bg-zwol-black/90 dark:bg-zwol-black/90 light:bg-white/90 backdrop-blur-md border-b border-white/5 dark:border-white/5 light:border-gray-200/20">
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
          <div className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400 light:text-gray-600">
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
                <i className="fa-solid fa-chevron-down text-[10px]" />
              </span>
            </div>
          </label>

          <button
            onClick={() => setCurrentView("cotizador")}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all"
          >
            {t.startProject}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white dark:text-white light:text-zwol-black text-2xl p-2 focus:outline-none"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zwol-dark/95 dark:bg-zwol-dark/95 light:bg-white/95 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-gray-200/20 px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest text-gray-300 dark:text-gray-300 light:text-gray-700">
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
                <i className="fa-solid fa-chevron-down text-[10px]" />
              </span>
            </div>
          </label>
          <a href="#concepto" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">{t.concept}</a>
          <a href="#desafio" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">{t.challenge}</a>
          <a href="#ingenieria" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">{t.engineering}</a>
          <a href="#control" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">{t.control}</a>
          <a href="#ecosistema" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">{t.ecosystem}</a>
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