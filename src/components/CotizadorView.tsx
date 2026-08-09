"use client";

import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";

interface CotizadorProps {
  onCancel?: () => void;
  onBack?: () => void;
}

export default function CotizadorView({ onCancel, onBack }: CotizadorProps) {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipoProp: "Vivienda Personal.",
    habitaciones: "4 a 6.",
    circuitos: "Hasta 30.",
    m2: "",
    noRecuerdoM2: false,
    pileta: "Sí (Automatizar bomba/filtrado).",
    riego: "Sí (Integrar al sistema).",
    confort: [] as string[],
    internet: "Starlink (Satelital Alta Velocidad).",
    solar: "Sí: Respaldo solar independiente (Core + Pantalla + Red).",
    notas: "",
    sistemaSolar: "No",
    heatingType: "Sin losa radiante",
    heatingZones: "",
    camerasPresent: "No",
    camerasWithSolar: "No",
    camerasCount: "",
    wifi: "Sí",
    sprinklersCount: "",
    irrigationZones: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

  useEffect(() => {
    if (showPreview) {
      setModalOpen(true);
      return;
    }

    if (modalOpen) {
      setModalClosing(true);
      const t = setTimeout(() => {
        setModalOpen(false);
        setModalClosing(false);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [showPreview]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [modalOpen]);

  const frases = [
    "⚡ Cada vez más cerca de tener tu casa inteligente.",
    "🚀 Arquitectura industrial y soft de vanguardia para tu propiedad.",
    "🔒 Soberanía absoluta, seguridad y control total en tus manos.",
    "🌟 Estás a un solo paso de elevar el estándar de tu hogar.",
  ];

  const reviewItems = [
    { label: "Nombre", value: formData.nombre || "No informado" },
    { label: "Teléfono", value: formData.telefono || "No informado" },
    { label: "Email", value: formData.email || "No informado" },
    { label: "Propiedad", value: formData.tipoProp },
    { label: "Habitaciones", value: formData.habitaciones },
    { label: "Circuitos", value: formData.circuitos },
    { label: "Pileta", value: formData.pileta },
    { label: "Riego", value: formData.riego },
    { label: "Internet", value: formData.internet },
    { label: "Sistema Solar", value: formData.sistemaSolar || "No informado" },
    { label: "Calefacción (tipo)", value: formData.heatingType || "No informado" },
    { label: "Zonas de calefacción", value: formData.heatingZones || "No informado" },
    { label: "Cámaras", value: formData.camerasPresent || "No informado" },
    { label: "Cantidad de cámaras", value: formData.camerasCount || "No informado" },
    { label: "Cámaras con paneles solares", value: formData.camerasWithSolar || "No informado" },
    { label: "WiFi / Red", value: formData.wifi || "No informado" },
    { label: "Aspersores (cantidad)", value: formData.sprinklersCount || "No informado" },
    { label: "Zonas de riego", value: formData.irrigationZones || "No informado" },
    { label: "Observaciones", value: formData.notas || "Sin observaciones adicionales" },
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.nombre || !formData.email || !formData.telefono)) {
      alert("Por favor completa nombre, teléfono y correo electrónico para continuar.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleClose = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    onBack?.();
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setShowPreview(false);

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
      const response = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cotizacionData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Error al enviar cotización");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("==================================");
      console.error("ERROR EN /api/cotizaciones");
      console.error(error);
      console.error("==================================");

      toast.error("Error al enviar cotización", {
        description: error instanceof Error ? error.message : "Error desconocido",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="glass-panel p-10 md:p-14 rounded-3xl border border-zwol-cyan/30 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-zwol-cyan/30 bg-zwol-cyan/10 text-zwol-cyan text-2xl">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div className="space-y-3">
            <h2 className="font-display font-bold text-white text-2xl uppercase">Consulta enviada</h2>
            <p className="text-gray-300 text-sm md:text-base">
              Gracias por confiar en ZWOL-HOME. Nos pondremos en contacto a la brevedad.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-xs uppercase tracking-wider"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Sistema Solar</label>
                  <select
                    value={formData.sistemaSolar}
                    onChange={(e) => setFormData({ ...formData, sistemaSolar: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Sí (Respaldo)">Sí (Respaldo)</option>
                    <option value="Sí (Principal)">Sí (Principal)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Tipo de Calefacción (losa)</label>
                  <select
                    value={formData.heatingType}
                    onChange={(e) => setFormData({ ...formData, heatingType: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sin losa radiante">Sin losa radiante</option>
                    <option value="Losa radiante c/ caldera">Losa radiante c/ caldera</option>
                    <option value="Losa radiante c/ resistencia">Losa radiante c/ resistencia</option>
                  </select>
                </div>

                {formData.heatingType && formData.heatingType !== "Sin losa radiante" && (
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Zonas de calefacción (cantidad)</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.heatingZones}
                      onChange={(e) => setFormData({ ...formData, heatingZones: e.target.value })}
                      placeholder="Ej. 3"
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">WiFi / Red</label>
                  <select
                    value={formData.wifi}
                    onChange={(e) => setFormData({ ...formData, wifi: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                    <option value="Mesh / Empresarial">Mesh / Empresarial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Cámaras de seguridad (posee)</label>
                  <select
                    value={formData.camerasPresent}
                    onChange={(e) => setFormData({ ...formData, camerasPresent: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>

                {formData.camerasPresent === "Sí" && (
                  <>
                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Cantidad de cámaras</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.camerasCount}
                        onChange={(e) => setFormData({ ...formData, camerasCount: e.target.value })}
                        placeholder="Ej. 4"
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Cámaras con paneles solares</label>
                      <select
                        value={formData.camerasWithSolar}
                        onChange={(e) => setFormData({ ...formData, camerasWithSolar: e.target.value })}
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      >
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.riego && formData.riego.startsWith("Sí") && (
                  <>
                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Aspersores (cantidad)</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.sprinklersCount}
                        onChange={(e) => setFormData({ ...formData, sprinklersCount: e.target.value })}
                        placeholder="Ej. 10"
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">Zonas de riego (cantidad)</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.irrigationZones}
                        onChange={(e) => setFormData({ ...formData, irrigationZones: e.target.value })}
                        placeholder="Ej. 2"
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-white/10">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
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
                  type="button"
                  onClick={() => setShowPreview(true)}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all disabled:opacity-60"
                >
                  Revisar consulta
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {modalOpen && (
        <div className={`fixed inset-0 z-[60] bg-black/80 px-4 py-6 flex items-end md:items-center justify-center transition-opacity duration-200 ease-out ${modalClosing ? "opacity-0" : "opacity-100"}`}>
          <div className={`w-full h-full md:h-auto md:max-h-[90vh] max-w-3xl mx-auto rounded-t-3xl md:rounded-3xl md:my-6 border border-zwol-cyan/30 bg-zwol-dark/95 p-4 md:p-10 shadow-[0_0_50px_rgba(0,210,255,0.25)] overflow-hidden flex flex-col transform transition-all duration-200 ease-out ${modalClosing ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-white text-xl uppercase">Revisa tu consulta</h3>
              <p className="text-sm text-gray-400">Confirma tus respuestas antes de enviar.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-6 mt-4 mb-4 overflow-y-auto flex-1">
              {reviewItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-[10px] uppercase tracking-widest text-zwol-cyan">{item.label}</span>
                  <span className="text-sm text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 pt-2 md:pt-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-mono text-xs uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
