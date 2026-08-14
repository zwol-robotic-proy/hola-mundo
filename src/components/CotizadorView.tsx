"use client";

import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import { translations, type Language } from "@/lib/translations";

interface CotizadorProps {
  onCancel?: () => void;
  onBack?: () => void;
  language: Language;
}

export default function CotizadorView({ onCancel, onBack, language }: CotizadorProps) {
  const t = translations[language].cotizador;
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
      const timeout = setTimeout(() => {
        setModalOpen(false);
        setModalClosing(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [showPreview, modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [modalOpen]);

  const frases = [
    t.ctaBanner,
    t.ctaBanner2,
    t.ctaBanner3,
    t.ctaBanner4,
  ];

  const reviewItems = [
    { label: t.review.nombre, value: formData.nombre || t.review.notInformed },
    { label: t.review.telefono, value: formData.telefono || t.review.notInformed },
    { label: t.review.email, value: formData.email || t.review.notInformed },
    { label: t.review.propiedad, value: formData.tipoProp },
    { label: t.review.habitaciones, value: formData.habitaciones },
    { label: t.review.circuitos, value: formData.circuitos },
    { label: t.review.pileta, value: formData.pileta },
    { label: t.review.riego, value: formData.riego },
    { label: t.review.internet, value: formData.internet },
    { label: t.review.sistemaSolar, value: formData.sistemaSolar || t.review.notInformed },
    { label: t.review.heatingType, value: formData.heatingType || t.review.notInformed },
    { label: t.review.heatingZones, value: formData.heatingZones || t.review.notInformed },
    { label: t.review.camerasPresent, value: formData.camerasPresent || t.review.notInformed },
    { label: t.review.camerasCount, value: formData.camerasCount || t.review.notInformed },
    { label: t.review.camerasWithSolar, value: formData.camerasWithSolar || t.review.notInformed },
    { label: t.review.wifi, value: formData.wifi || t.review.notInformed },
    { label: t.review.sprinklersCount, value: formData.sprinklersCount || t.review.notInformed },
    { label: t.review.irrigationZones, value: formData.irrigationZones || t.review.notInformed },
    { label: t.review.notas, value: formData.notas || t.review.emptyObservations },
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.nombre || !formData.email || !formData.telefono)) {
      alert(t.alertRequired);
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
            <h2 className="font-display font-bold text-white text-2xl uppercase">{t.successTitle}</h2>
            <p className="text-gray-300 text-sm md:text-base">{t.successText}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-xs uppercase tracking-wider"
          >
            {t.successButton}
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
            {t.welcome}
          </span>
          <h1 className="font-display font-bold text-white uppercase text-2xl md:text-3xl tracking-tight">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-500">{t.titleAccent}</span>
          </h1>
          <div className="font-mono text-xs text-zwol-cyan tracking-wider bg-zwol-cyan/5 py-2 px-4 rounded-full inline-block border border-zwol-cyan/20">
            {frases[step - 1]}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">{t.formStep1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.nombre}</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder={t.placeholders.nombre}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.telefono}</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder={t.placeholders.telefono}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.placeholders.email}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.tipoProp}</label>
                  <select
                    value={formData.tipoProp}
                    onChange={(e) => setFormData({ ...formData, tipoProp: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Vivienda Personal">{t.options.tipoProp.personal}</option>
                    <option value="Casa de Fin de Semana">{t.options.tipoProp.weekend}</option>
                    <option value="Comercial / Oficina">{t.options.tipoProp.commercial}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">{t.formStep2}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.habitaciones}</label>
                  <select
                    value={formData.habitaciones}
                    onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="1 a 3">{t.options.habitaciones["1"]}</option>
                    <option value="4 a 6">{t.options.habitaciones["2"]}</option>
                    <option value="7 a 10">{t.options.habitaciones["3"]}</option>
                    <option value="10+">{t.options.habitaciones["4"]}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.circuitos}</label>
                  <select
                    value={formData.circuitos}
                    onChange={(e) => setFormData({ ...formData, circuitos: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Hasta 15">{t.options.circuitos["1"]}</option>
                    <option value="Hasta 30">{t.options.circuitos["2"]}</option>
                    <option value="Hasta 60">{t.options.circuitos["3"]}</option>
                    <option value="160 Nodos">{t.options.circuitos["4"]}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">{t.formStep3}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.pileta}</label>
                  <select
                    value={formData.pileta}
                    onChange={(e) => setFormData({ ...formData, pileta: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sí (Automatizar bomba/filtrado)">{t.options.pileta.yes}</option>
                    <option value="No">{t.options.pileta.no}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.riego}</label>
                  <select
                    value={formData.riego}
                    onChange={(e) => setFormData({ ...formData, riego: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sí (Integrar al sistema)">{t.options.riego.yes}</option>
                    <option value="No">{t.options.riego.no}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display font-bold text-white text-lg border-b border-white/10 pb-2">{t.formStep4}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.internet}</label>
                  <select
                    value={formData.internet}
                    onChange={(e) => setFormData({ ...formData, internet: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Starlink (Satelital Alta Velocidad)">{t.options.internet.starlink}</option>
                    <option value="Fibra Óptica (Movistar / Flow)">{t.options.internet.fibra}</option>
                    <option value="Redundante (Ambas)">{t.options.internet.redundant}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.notas}</label>
                  <textarea
                    rows={2}
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                    placeholder={t.placeholders.notas}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.sistemaSolar}</label>
                  <select
                    value={formData.sistemaSolar}
                    onChange={(e) => setFormData({ ...formData, sistemaSolar: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="No">{t.options.sistemaSolar.no}</option>
                    <option value="Sí (Respaldo)">{t.options.sistemaSolar.yesBackup}</option>
                    <option value="Sí (Principal)">{t.options.sistemaSolar.yesMain}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.heatingType}</label>
                  <select
                    value={formData.heatingType}
                    onChange={(e) => setFormData({ ...formData, heatingType: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sin losa radiante">{t.options.heatingType.none}</option>
                    <option value="Losa radiante c/ caldera">{t.options.heatingType.boiler}</option>
                    <option value="Losa radiante c/ resistencia">{t.options.heatingType.resistance}</option>
                  </select>
                </div>

                {formData.heatingType && formData.heatingType !== "Sin losa radiante" && (
                  <div>
                    <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.heatingZones}</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.heatingZones}
                      onChange={(e) => setFormData({ ...formData, heatingZones: e.target.value })}
                      placeholder={t.placeholders.heatingZones}
                      className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.wifi}</label>
                  <select
                    value={formData.wifi}
                    onChange={(e) => setFormData({ ...formData, wifi: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="Sí">{t.options.wifi.yes}</option>
                    <option value="No">{t.options.wifi.no}</option>
                    <option value="Mesh / Empresarial">{t.options.wifi.mesh}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.camerasPresent}</label>
                  <select
                    value={formData.camerasPresent}
                    onChange={(e) => setFormData({ ...formData, camerasPresent: e.target.value })}
                    className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                  >
                    <option value="No">{t.options.camerasPresent.no}</option>
                    <option value="Sí">{t.options.camerasPresent.yes}</option>
                  </select>
                </div>

                {formData.camerasPresent === "Sí" && (
                  <>
                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.camerasCount}</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.camerasCount}
                        onChange={(e) => setFormData({ ...formData, camerasCount: e.target.value })}
                        placeholder={t.placeholders.camerasCount}
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.camerasWithSolar}</label>
                      <select
                        value={formData.camerasWithSolar}
                        onChange={(e) => setFormData({ ...formData, camerasWithSolar: e.target.value })}
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      >
                        <option value="No">{t.options.camerasWithSolar.no}</option>
                        <option value="Sí">{t.options.camerasWithSolar.yes}</option>
                      </select>
                    </div>
                  </>
                )}

                {formData.riego && formData.riego.startsWith("Sí") && (
                  <>
                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.sprinklersCount}</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.sprinklersCount}
                        onChange={(e) => setFormData({ ...formData, sprinklersCount: e.target.value })}
                        placeholder={t.placeholders.sprinklersCount}
                        className="w-full bg-zwol-dark border border-white/10 rounded-xl p-3.5 text-white font-mono text-sm focus:border-zwol-cyan focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-gray-300 uppercase mb-1">{t.labels.irrigationZones}</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.irrigationZones}
                        onChange={(e) => setFormData({ ...formData, irrigationZones: e.target.value })}
                        placeholder={t.placeholders.irrigationZones}
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
                {t.buttons.backHome}
              </button>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  {t.buttons.previous}
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
                  {t.buttons.next}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all disabled:opacity-60"
                >
                  {t.buttons.review}
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
              <h3 className="font-display font-bold text-white text-xl uppercase">{t.reviewTitle}</h3>
              <p className="text-sm text-gray-400">{t.reviewSubtitle}</p>
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
                {t.buttons.cancel}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-zwol-cyan to-blue-600 text-zwol-black font-bold text-xs uppercase tracking-wider disabled:opacity-60"
              >
                {isSubmitting ? t.buttons.sending : t.buttons.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
