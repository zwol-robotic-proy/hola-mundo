"use client";

import { useState } from "react";
import { toast } from "sonner";

interface CotizadorProps {
  onCancel: () => void;
}

export default function CotizadorView({ onCancel }: CotizadorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipoProp: "Vivienda Personal",
    habitaciones: "4 a 6",
    circuitos: "Hasta 30",
    m2: "",
    noRecuerdoM2: false,
    pileta: "Sí (Automatizar bomba/filtrado)",
    riego: "Sí (Integrar al sistema)",
    confort: [] as string[],
    internet: "Starlink (Satelital Alta Velocidad)",
    solar: "Sí: Respaldo solar independiente (Core + Pantalla + Red)",
    notas: "",
  });

  const frases = [
    "⚡ Cada vez más cerca de tener tu casa inteligente.",
    "🚀 Arquitectura industrial y soft de vanguardia para tu propiedad.",
    "🔒 Soberanía absoluta, seguridad y control total en tus manos.",
    "🌟 Estás a un solo paso de elevar el estándar de tu hogar.",
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.nombre || !formData.email || !formData.telefono)) {
      alert("Por favor completa nombre, teléfono y correo electrónico para continuar.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparar datos del formulario
    const cotizacionData = {
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      tipoProp: formData.tipoProp,
      habitaciones: formData.habitaciones,
      circuitos: formData.circuitos,
      m2: formData.m2,
      pileta: formData.pileta,
      riego: formData.riego,
      confort: formData.confort,
      internet: formData.internet,
      solar: formData.solar,
      notas: formData.notas,
      timestamp: new Date().toISOString(),
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://zwol-home.com",
    };

    try {
      // Enviar cotización a través de API
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cotizacionData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Error al enviar cotización");
      }

      toast.success("Cotización enviada correctamente", {
        description: `${formData.nombre} · ${formData.email} · ${formData.tipoProp}`,
      });

      window.setTimeout(() => {
        onCancel();
      }, 1200);
    } catch (error) {
      console.error("==================================");
      console.error("ERROR EN /api/cotizaciones");
      console.error(error);
      console.error("==================================");

      toast.error("Error al enviar cotización", {
        description:
          error instanceof Error
            ? error.message
            : "Error desconocido",
      });
    }

    return (
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden border border-zwol-cyan/30 space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">
              Bienvenido a tu Ecosistema
            </span>
            <h1 className="font-display font-bold text-white uppercase text-2xl md:text-3xl tracking-tight">
              Configura tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-500">Instalación</span>
            </h1>
            <div className="font-mono text-xs text-zwol-cyan tracking-wider bg-zwol-cyan/5 py-2 px-4 rounded-full inline-block border border-zwol-cyan/20">
              {frases[step - 1]}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">
                  01. Datos del Propietario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Nombre y Apellido</label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Alfredo Gómez"
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+54 11 ..."
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Tipo de Propiedad</label>
                    <select
                      value={formData.tipoProp}
                      onChange={(e) => setFormData({ ...formData, tipoProp: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="Vivienda Personal">Vivienda Personal</option>
                      <option value="Casa de Fin de Semana">Casa de Fin de Semana</option>
                      <option value="Comercial / Oficina">Comercial / Oficina</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">
                  02. Dimensiones de la Propiedad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Cantidad de Habitaciones</label>
                    <select
                      value={formData.habitaciones}
                      onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="1 a 3">1 a 3 Habitaciones</option>
                      <option value="4 a 6">4 a 6 Habitaciones (Standard)</option>
                      <option value="7 a 10">7 a 10 Habitaciones (Residencia)</option>
                      <option value="10+">Más de 10 Habitaciones</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Circuitos de Luces</label>
                    <select
                      value={formData.circuitos}
                      onChange={(e) => setFormData({ ...formData, circuitos: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="Hasta 15">Hasta 15 circuitos</option>
                      <option value="Hasta 30">Hasta 30 circuitos</option>
                      <option value="Hasta 60">Hasta 60 circuitos (DALI/DMX)</option>
                      <option value="160 Nodos">Infraestructura Máxima (160 Nodos)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">
                  03. Exteriores & Automatización
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">¿Posee Pileta?</label>
                    <select
                      value={formData.pileta}
                      onChange={(e) => setFormData({ ...formData, pileta: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="Sí (Automatizar bomba/filtrado)">Sí (Incluir automatización de bomba)</option>
                      <option value="No">No posee</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">¿Posee Riego Automático?</label>
                    <select
                      value={formData.riego}
                      onChange={(e) => setFormData({ ...formData, riego: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="Sí (Integrar al sistema)">Sí (Integrar al núcleo Zwol-Core)</option>
                      <option value="No">No posee</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">
                  04. Conectividad & Autonomía
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Internet Principal</label>
                    <select
                      value={formData.internet}
                      onChange={(e) => setFormData({ ...formData, internet: e.target.value })}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    >
                      <option value="Starlink (Satelital Alta Velocidad)">Starlink (Satelital)</option>
                      <option value="Fibra Óptica (Movistar / Flow)">Fibra Óptica (Local)</option>
                      <option value="Redundante (Ambas)">Redundante (Doble Enlace)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Observaciones</label>
                    <textarea
                      rows={2}
                      value={formData.notas}
                      onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                      placeholder="Detalles particulares..."
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  Volver al Inicio
                </button>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                  >
                    Anterior
                  </button>
                )}
              </div>

              <div>
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all"
                  >
                    Enviar Cotización
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}