"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface NavbarProps {
  currentView: "home" | "cotizador";
  setCurrentView: (view: "home" | "cotizador") => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            <a href="#concepto" className="hover:text-zwol-cyan transition-colors">01. Concepto</a>
            <a href="#desafio" className="hover:text-zwol-cyan transition-colors">02. El Desafío</a>
            <a href="#ingenieria" className="hover:text-zwol-cyan transition-colors">03. ModBus TCP-IP</a>
            <a href="#control" className="hover:text-zwol-cyan transition-colors">04. Interfaces</a>
            <a href="#ecosistema" className="hover:text-zwol-cyan transition-colors">05. Ecosistema</a>
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-4">
          {/* {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group relative w-12 h-12 rounded-full bg-white/10 dark:bg-white/10 light:bg-gray-200/30 border border-white/20 dark:border-white/20 light:border-gray-300/30 flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-gray-300/40 transition-all duration-300 overflow-hidden"
              aria-label="Toggle theme"
              title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zwol-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {theme === "dark" ? (
                <i className="fa-solid fa-sun text-yellow-300 text-lg relative z-10 transition-transform group-hover:scale-110" />
              ) : (
                <i className="fa-solid fa-moon text-slate-400 text-lg relative z-10 transition-transform group-hover:scale-110" />
              )}
            </button>
          )} */}

          <button
            onClick={() => setCurrentView("cotizador")}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all"
          >
            Iniciar Proyecto
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
          <a href="#concepto" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">01. Concepto</a>
          <a href="#desafio" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">02. El Desafío</a>
          <a href="#ingenieria" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">03. ModBus TCP-IP</a>
          <a href="#control" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">04. Interfaces</a>
          <a href="#ecosistema" onClick={() => { setCurrentView("home"); setMobileMenuOpen(false); }} className="block hover:text-zwol-cyan">05. Ecosistema</a>
          <button
            onClick={() => { setCurrentView("cotizador"); setMobileMenuOpen(false); }}
            className="w-full text-center py-3 rounded-xl bg-zwol-cyan text-zwol-black font-bold uppercase"
          >
            Iniciar Proyecto
          </button>
        </div>
      )}
    </nav>
  );
}