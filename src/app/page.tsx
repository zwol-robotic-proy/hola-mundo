"use client";

import { useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HomeView from "@/components/HomeView";
import CotizadorView from "@/components/CotizadorView";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "cotizador">("home");

  return (
    <main className="min-h-screen bg-zwol-black text-slate-200 relative overflow-x-hidden">
      <BackgroundCanvas />
      <CustomCursor />

      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === "home" ? (
        <HomeView onOpenCotizador={() => setCurrentView("cotizador")} />
      ) : (
      
          <CotizadorView onBack={() => setCurrentView("home")} />
      
      )}
    </main>
  );
}