"use client";

import { useState } from "react";

interface NavbarProps {
  currentView: "home" | "cotizador";
  setCurrentView: (view: "home" | "cotizador") => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-300 bg-zwol-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => setCurrentView("home")} className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zwol-cyan to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.4)]">
            <i className="fa-solid fa-microchip text-zwol-black text-lg" />
          </div>
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-white uppercase">
            Zwol<span className="text-zwol-cyan">-</span>Home
          </span>
        </button>

        {currentView === "home" && (
          <div className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-gray-400">
            <a href="#concepto" className="hover:text-zwol-cyan transition-colors">01. Concepto</a>
            <a href="#desafio" className="hover:text-zwol-cyan transition-colors">02. El Desafío</a>
            <a href="#ingenieria" className="hover:text-zwol-cyan transition-colors">03. ModBus TCP-IP</a>
            <a href="#control" className="hover:text-zwol-cyan transition-colors">04. Interfaces</a>
            <a href="#ecosistema" className="hover:text-zwol-cyan transition-colors">05. Ecosistema</a>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("cotizador")}
            className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all"
          >
            Iniciar Proyecto
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl p-2 focus:outline-none"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zwol-dark/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest text-gray-300">
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