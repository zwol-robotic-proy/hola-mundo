"use client";

import { useEffect, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HomeView from "@/components/HomeView";
import CotizadorView from "@/components/CotizadorView";
import type { Language } from "@/lib/translations";

const STORAGE_KEY = "zwol-language";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "cotizador">("home");
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLanguage === "es" || savedLanguage === "pt" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  return (
    <main className="min-h-screen bg-zwol-black text-slate-200 relative overflow-x-hidden">
      <BackgroundCanvas />
      <CustomCursor />

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
      />

      {currentView === "home" ? (
        <HomeView
          onOpenCotizador={() => setCurrentView("cotizador")}
          language={language}
        />
      ) : (
        <CotizadorView
          onBack={() => setCurrentView("home")}
          language={language}
        />
      )}
    </main>
  );
}