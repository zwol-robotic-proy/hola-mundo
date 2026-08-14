"use client";

import Link from "next/link";
import { buildWhatsAppLink, contactConfig } from "@/lib/contact";
import { translations, type Language } from "@/lib/translations";

interface HomeViewProps {
  onOpenCotizador: () => void;
  language: Language;
}

export default function HomeView({ onOpenCotizador, language }: HomeViewProps) {
  const t = translations[language].home;

  const marqueeItems = [
    { icon: "fa-bolt", label: t.marquee.modbus },
    { icon: "fa-shield-cat", label: t.marquee.localFirst },
    { icon: "fa-network-wired", label: t.marquee.topology },
    { icon: "fa-display", label: t.marquee.hmi },
    { icon: "fa-infinity", label: t.marquee.nodes },
    { icon: "fa-house-signal", label: t.marquee.assistant },
  ];

  const marqueeContent = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative z-10 pt-28">
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel text-zwol-cyan text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-zwol-cyan animate-pulse" />
              {t.badge}
            </div>

            <h1 className="font-display font-extrabold text-white uppercase tracking-tighter title-hero">
              {t.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan via-blue-400 to-indigo-300">
                {t.heroTitleAccent}
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            <blockquote className="border-l-2 border-zwol-cyan pl-4 text-sm md:text-base italic text-gray-400 font-mono">
              {t.quote}
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#concepto"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(0,210,255,0.3)] inline-flex items-center justify-center gap-3 hover-target"
              >
                {t.ctaExplore}
                <i className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="#ingenieria"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl glass-panel text-white font-bold text-sm uppercase tracking-wider hover:border-zwol-cyan transition-all inline-flex items-center justify-center hover-target"
              >
                {t.ctaSpecs}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-container aspect-[4/5] glass-panel p-2 max-w-md mx-auto lg:max-w-none hover-target relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt={language === "en" ? "Smart home architecture" : language === "pt" ? "Arquitetura de casa inteligente" : "Arquitectura Smart Home"}
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-3 md:p-4 rounded-xl glass-panel text-[11px] md:text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>{t.statBrain}</span>
                  <span className="text-zwol-cyan font-bold tracking-wider">{t.statBrainValue}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t.statLatency}</span>
                  <span className="text-green-400">{t.statLatencyValue}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t.statNodes}</span>
                  <span className="text-white">{t.statNodesValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 bg-zwol-dark/90 backdrop-blur-sm py-4 overflow-hidden my-12 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zwol-dark via-zwol-dark/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zwol-dark via-zwol-dark/50 to-transparent z-10 pointer-events-none" />


        <div className="marquee-track flex items-center w-max whitespace-nowrap font-mono text-xs md:text-sm text-zwol-cyan tracking-widest uppercase marquee-glow">
          {[...marqueeContent, ...marqueeContent].map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center shrink-0"
            >
              <span className="mx-4 md:mx-6">
                <i className={`fa-solid ${item.icon} mr-2`} />
                {item.label}
              </span>
            </div>
          ))}
        </div>


        <style jsx>{`
                @keyframes marquee {
                  0% {
                    transform: translateX(0);
                  }


                  100% {
                    transform: translateX(-50%);
                  }
                }


                .marquee-track {
                  animation: marquee 50s linear infinite;
                }


                .marquee-track:hover {
                  animation-play-state: paused;
                }
              `}</style>
      </div>

      <section id="concepto" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.philosophyLabel}</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            {t.sections.philosophyTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-500">{t.sections.philosophyTitleAccent}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl font-light">{t.sections.philosophyText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-cubes" />
            </div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.card1Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.card1Text}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-industry" />
            </div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.card2Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.card2Text}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-user-lock" />
            </div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.card3Title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.card3Text}</p>
          </div>
        </div>
      </section>

      <section id="desafio" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden">
          <div className="space-y-4 mb-12">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.challengeLabel}</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              {t.sections.challengeTitle} <span className="text-red-400">{t.sections.challengeTitleAccent}</span> {t.sections.challengeVs} <span className="text-zwol-cyan">{t.sections.challengeReply}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 border-l-2 border-red-500/30 pl-6">
              <h3 className="font-display font-bold text-xl text-red-400 uppercase tracking-wider flex items-center gap-3">
                <i className="fa-solid fa-circle-xmark" />
                {t.sections.challengeLeftTitle}
              </h3>
              <div className="space-y-4">
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeLeft1}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeLeft1Text}</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeLeft2}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeLeft2Text}</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeLeft3}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeLeft3Text}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-l-2 border-zwol-cyan pl-6">
              <h3 className="font-display font-bold text-xl text-zwol-cyan uppercase tracking-wider flex items-center gap-3">
                <i className="fa-solid fa-circle-check" />
                {t.sections.challengeRightTitle}
              </h3>
              <div className="space-y-4">
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeRight1}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeRight1Text}</p>
                </div>
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeRight2}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeRight2Text}</p>
                </div>
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">{t.sections.challengeRight3}</h4>
                  <p className="text-gray-400 text-sm">{t.sections.challengeRight3Text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ingenieria" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.engineeringLabel}</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              {t.sections.engineeringTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-600">{t.sections.engineeringTitleAccent}</span>
            </h2>
            <p className="text-gray-300 font-light text-base leading-relaxed">{t.sections.engineeringText}</p>

            <div className="grid grid-cols-2 gap-4 font-mono pt-4">
              <div className="glass-panel p-4 rounded-xl space-y-1">
                <span className="text-zwol-cyan font-bold text-3xl">160</span>
                <p className="text-gray-400 text-xs">{t.sections.stat160}</p>
              </div>
              <div className="glass-panel p-4 rounded-xl space-y-1">
                <span className="text-zwol-cyan font-bold text-3xl">0.2ms</span>
                <p className="text-gray-400 text-xs">{t.sections.statLatencyLabel}</p>
              </div>
            </div>

            <ul className="space-y-3 font-mono text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-zwol-cyan" />{t.sections.engineeringList1}</li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-zwol-cyan" />{t.sections.engineeringList2}</li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check text-zwol-cyan" />{t.sections.engineeringList3}</li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="img-container aspect-square glass-panel p-2 hover-target">
              <img src="https://oa7wcdk05oqhgv2n.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-28%20at%208.32.27%20AM%20%281%29.jpeg" alt={language === "en" ? "Servers and infrastructure" : language === "pt" ? "Servidores e infraestrutura" : "Servidores e Infraestructura"} />
            </div>
          </div>
        </div>
      </section>

      <section id="control" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 text-center">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.controlLabel}</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            {t.sections.controlTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-indigo-400">{t.sections.controlTitleAccent}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">{t.sections.controlText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video"><img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop" alt={language === "en" ? "HMI touch panel" : language === "pt" ? "Painel tátil HMI" : "Panel táctil HMI"} /></div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">{t.sections.panelTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.sections.panelText}</p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video"><img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop" alt={language === "en" ? "Mobile app" : language === "pt" ? "Aplicativo móvel" : "Aplicación móvil"} /></div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">{t.sections.mobileTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.sections.mobileText}</p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video"><img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop" alt={language === "en" ? "Smart switches" : language === "pt" ? "Interruptores inteligentes" : "Interruptores inteligentes"} /></div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">{t.sections.physicalTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.sections.physicalText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ecosistema" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-panel p-8 md:p-14 rounded-3xl space-y-12">
          <div className="space-y-4 text-center">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.ecosystemLabel}</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              {t.sections.ecosystemTitle} <span className="text-zwol-cyan">{t.sections.ecosystemTitleAccent}</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">{t.sections.ecosystemText}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-solid fa-house-signal text-zwol-cyan text-4xl" />
              <h3 className="font-bold text-white text-base">{t.sections.homeAssistant}</h3>
              <p className="text-gray-400 text-xs">{t.sections.homeAssistantText}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-apple text-white text-4xl" />
              <h3 className="font-bold text-white text-base">{t.sections.appleHome}</h3>
              <p className="text-gray-400 text-xs">{t.sections.appleHomeText}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-google text-red-400 text-4xl" />
              <h3 className="font-bold text-white text-base">{t.sections.googleHome}</h3>
              <p className="text-gray-400 text-xs">{t.sections.googleHomeText}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-spotify text-green-400 text-4xl" />
              <h3 className="font-bold text-white text-base">{t.sections.spotify}</h3>
              <p className="text-gray-400 text-xs">{t.sections.spotifyText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">{t.sections.automationsLabel}</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            {t.sections.automationsTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-400">{t.sections.automationsTitleAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl"><i className="fa-solid fa-door-open" /></div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.sceneTitle}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.sceneText}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl"><i className="fa-solid fa-moon" /></div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.absenceTitle}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.absenceText}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl"><i className="fa-solid fa-leaf" /></div>
            <h3 className="font-display font-bold text-white title-card">{t.sections.efficiencyTitle}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.sections.efficiencyText}</p>
          </div>
        </div>
      </section>

      <footer id="contacto" className="border-t border-white/10 bg-zwol-black py-20 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 uppercase tracking-tighter title-hero">
              {t.sections.footerTitle}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">{t.sections.footerText}</p>
            <div className="pt-4">
              <button
                onClick={onOpenCotizador}
                className="hover-target inline-flex items-center gap-3 px-10 py-5 rounded-full bg-zwol-cyan text-zwol-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)]"
              >
                <i className="fa-solid fa-file-invoice-dollar" />
                {t.sections.footerButton}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div>
              <p className="text-white font-bold mb-1">{t.sections.footerColumnTitle}</p>
              <p>{t.sections.footerColumnSubtitle}</p>
              <p>{t.sections.footerLocation}</p>
            </div>
            <div className="text-left md:text-center space-y-2">
              <p className="text-white font-bold mb-1">{t.sections.contactTitle}</p>
              <a href={buildWhatsAppLink(contactConfig.phone, contactConfig.whatsappMessage)} target="_blank" rel="noreferrer" className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-brands fa-whatsapp" /> {contactConfig.phoneDisplay}
              </a>
              <a href={`mailto:${contactConfig.email}`} className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-solid fa-envelope" /> {contactConfig.email}
              </a>
              <Link href={contactConfig.instagramUrl} target="_blank" rel="noreferrer" className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-brands fa-instagram" /> {contactConfig.instagramLabel}
              </Link>
            </div>
            <div className="text-left md:text-right">
              <p>&copy; 2026 ZWOL-HOME.</p>
              <p>{t.sections.rights}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}