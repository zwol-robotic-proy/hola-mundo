"use client";

import Link from "next/link";
import { buildWhatsAppLink, contactConfig } from "@/lib/contact";

interface HomeViewProps {
  onOpenCotizador: () => void;
}

export default function HomeView({ onOpenCotizador }: HomeViewProps) {
  const marqueeItems = [
    { icon: "fa-bolt", label: "Protocolo ModBus TCP-IP" },
    { icon: "fa-shield-cat", label: "Procesamiento Local First" },
    { icon: "fa-network-wired", label: "Topología Descentralizada" },
    { icon: "fa-display", label: "Pantalla Táctil HMI 10\"" },
    { icon: "fa-infinity", label: "Hasta 160 Nodos de Entrada / Salida" },
    { icon: "fa-house-signal", label: "Integración Home Assistant" },
  ];

  const marqueeContent = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative z-10 pt-28">
      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel text-zwol-cyan text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-zwol-cyan animate-pulse" />
              Ingeniería Residencial de Alta Gama • Nordelta
            </div>

            <h1 className="font-display font-extrabold text-white uppercase tracking-tighter title-hero">
              Tu hogar, tus reglas, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan via-blue-400 to-indigo-300">
                soft de vanguardia.
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-xl">
              La unificación definitiva entre la domótica de lujo y la robustez de la ingeniería industrial. Un único cerebro operativo diseñado para no fallar jamás.
            </p>

            <blockquote className="border-l-2 border-zwol-cyan pl-4 text-sm md:text-base italic text-gray-400 font-mono">
              "No importa desde dónde lo controles, sino a dónde quieres llegar. Y Zwol-Home lo resuelve."
            </blockquote>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#concepto"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(0,210,255,0.3)] inline-flex items-center justify-center gap-3 hover-target"
              >
                Explorar Ecosistema
                <i className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="#ingenieria"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl glass-panel text-white font-bold text-sm uppercase tracking-wider hover:border-zwol-cyan transition-all inline-flex items-center justify-center hover-target"
              >
                Especificaciones ModBus
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-container aspect-[4/5] glass-panel p-2 max-w-md mx-auto lg:max-w-none hover-target relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Arquitectura Smart Home"
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-3 md:p-4 rounded-xl glass-panel text-[11px] md:text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>CEREBRO CENTRAL:</span>
                  <span className="text-zwol-cyan font-bold tracking-wider">ZWOL-CORE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>LATENCIA DE RED:</span>
                  <span className="text-green-400">0.2ms (CERO LATENCIA)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>NODOS FÍSICOS I/O:</span>
                  <span className="text-white">HASTA 160 NODOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER INDUSTRIAL */}
      <div className="border-y border-white/10 bg-zwol-dark/90 backdrop-blur-sm py-4 overflow-hidden my-12 relative">
        {/* Efecto fade en los bordes */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zwol-dark via-zwol-dark/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zwol-dark via-zwol-dark/50 to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee whitespace-nowrap font-mono text-xs md:text-sm text-zwol-cyan tracking-widest uppercase flex items-center marquee-glow">
          {marqueeContent.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center shrink-0">
              <span className="mx-4 md:mx-6">
                <i className={`fa-solid ${item.icon} mr-2`} />
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 01: CONCEPTO FUNDAMENTAL */}
      <section id="concepto" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">01. Filosofía de Integración</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            Concepto <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-500">Fundamental</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl font-light">
            Zwol-Home eleva el estándar de conectividad residencial. Más que una simple "casa inteligente", creamos un ecosistema vivo que reduce fricciones, anticipa tus necesidades y trabaja en silencio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-cubes" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Sin Ataduras Propietarias</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Arquitectura abierta y modular. Integración sin bloqueos con las mejores marcas y estándares internacionales del mercado sin depender de un fabricante cerrado.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-industry" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Fiabilidad Industrial 24/7</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Componentes y lógica heredados de la automatización robótica e industrial. Diseñado para operar de forma continua sin reinicios ni congelamientos.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glass-card-hover space-y-4 hover-target">
            <div className="w-12 h-12 rounded-xl bg-zwol-cyan/10 border border-zwol-cyan/30 flex items-center justify-center text-zwol-cyan text-xl">
              <i className="fa-solid fa-user-lock" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Privacidad "Local First"</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tus datos, rutinas, cámaras y biometría se procesan físicamente dentro de tu propiedad. Cero dependencia de servidores externos o nubes vulnerables.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 02: EL DESAFÍO ACTUAL */}
      <section id="desafio" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-panel p-8 md:p-14 rounded-3xl relative overflow-hidden">
          <div className="space-y-4 mb-12">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">02. Fin a la Fragmentación</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              El Desafío <span className="text-red-400">Actual</span> vs <span className="text-zwol-cyan">Zwol-Home</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 border-l-2 border-red-500/30 pl-6">
              <h3 className="font-display font-bold text-xl text-red-400 uppercase tracking-wider flex items-center gap-3">
                <i className="fa-solid fa-circle-xmark" />
                El Estándar Comercial Frágil
              </h3>
              <div className="space-y-4">
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">Apps Dispersas & Múltiples Pantallas</h4>
                  <p className="text-gray-400 text-sm">Una aplicación para el aire acondicionado, otra para luces, otra para cámaras. Frustración y complejidad diaria.</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">Dispositivos Aislados sin Diálogo</h4>
                  <p className="text-gray-400 text-sm">Componentes de distintos proveedores que no interactúan entre sí, requiriendo intervención manual permanente.</p>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-bold text-white text-base mb-1">Saturación WiFi & Dependencia Cloud</h4>
                  <p className="text-gray-400 text-sm">Sistemas inalámbricos que caen ante cortes de internet o lentitud de servidores externos globales.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-l-2 border-zwol-cyan pl-6">
              <h3 className="font-display font-bold text-xl text-zwol-cyan uppercase tracking-wider flex items-center gap-3">
                <i className="fa-solid fa-circle-check" />
                La Respuesta Zwol-Home
              </h3>
              <div className="space-y-4">
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">Un Único Cerebro Operativo</h4>
                  <p className="text-gray-400 text-sm">Consolidación total. Gestiona clima, audio, seguridad y luces desde una interfaz unificada y fluida.</p>
                </div>
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">Red Alámbrica Industrial Estructurada</h4>
                  <p className="text-gray-400 text-sm">Cableado Cat6/KNX que elimina interferencias electromagnéticas y brinda ejecución con latencia 0.2ms.</p>
                </div>
                <div className="bg-zwol-cyan/5 p-4 rounded-xl border border-zwol-cyan/20">
                  <h4 className="font-bold text-white text-base mb-1">Soberanía de Datos Local First</h4>
                  <p className="text-gray-400 text-sm">Inmune a caídas mundiales de internet. Tu propiedad funciona autónomamente 24 horas al día, 365 días al año.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 03: INGENIERÍA MODBUS TCP-IP */}
      <section id="ingenieria" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">03. Arquitectura Robusta</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              Potencia de Ingeniería <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-600">ModBus TCP-IP</span>
            </h2>
            <p className="text-gray-300 font-light text-base leading-relaxed">
              Implementamos el protocolo estándar de la automatización industrial pesada. Una infraestructura alámbrica diseñada para cubrir superficies extensas de más de 1.000 m² sin pérdida de señal.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono pt-4">
              <div className="glass-panel p-4 rounded-xl space-y-1">
                <span className="text-zwol-cyan font-bold text-3xl">160</span>
                <p className="text-gray-400 text-xs">NODOS FÍSICOS I/O</p>
              </div>
              <div className="glass-panel p-4 rounded-xl space-y-1">
                <span className="text-zwol-cyan font-bold text-3xl">0.2ms</span>
                <p className="text-gray-400 text-xs">LATENCIA DE COMUNICACIÓN</p>
              </div>
            </div>

            <ul className="space-y-3 font-mono text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check text-zwol-cyan" />
                Topología descentralizada: la falla de un nodo no detiene al resto.
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check text-zwol-cyan" />
                Soporte nativo para motores, climatización trifásica e iluminación DALI/DMX.
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-check text-zwol-cyan" />
                Gabinete técnico con protección contra sobretensiones y redundancia física.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="img-container aspect-square glass-panel p-2 hover-target">
              <img src="https://oa7wcdk05oqhgv2n.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-28%20at%208.32.27%20AM%20%281%29.jpeg" alt="Servidores e Infraestructura" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 04: INTERFACES Y CONTROL */}
      <section id="control" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 text-center">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">04. Ergonomía & Control</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            Hardware de Control & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-indigo-400">Puntos de Mando</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            El control debe adaptarse al usuario, nunca al revés. Zwol-Home ofrece tres niveles de interacción simultáneos e independientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video">
              <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop" alt="Panel Táctil HMI" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">Panel Táctil HMI 10"</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pantalla capacitiva empotrada de grado industrial. Respuesta háptica inmediata para el control integral de la propiedad sin depender de teléfonos móviles.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video">
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop" alt="Aplicación móvil" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">Control Global Smartphone</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Acceso remoto cifrado desde cualquier lugar del mundo. Visualiza cámaras en vivo, ajusta la temperatura antes de llegar o verifica la seguridad de tu hogar.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-6 glass-card-hover hover-target">
            <div className="img-container aspect-video">
              <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop" alt="Interruptores inteligentes" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white title-card mb-2">Teclas Físicas Inteligentes</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mantiene la calidez y practicidad de los interruptores tradicionales de pared, dotándolos de lógica inteligente (pulsación larga, doble clic para escenas complejas).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 05: ECOSISTEMA ABIERTO */}
      <section id="ecosistema" className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-panel p-8 md:p-14 rounded-3xl space-y-12">
          <div className="space-y-4 text-center">
            <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">05. Compatibilidad Universal</span>
            <h2 className="font-display font-bold text-white uppercase title-section">
              Ecosistema <span className="text-zwol-cyan">Abierto</span>
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
              Integración nativa respaldada por Home Assistant y compatibilidad con las principales plataformas globales de consumo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-solid fa-house-signal text-zwol-cyan text-4xl" />
              <h3 className="font-bold text-white text-base">Home Assistant</h3>
              <p className="text-gray-400 text-xs">Núcleo de automatización local más avanzado.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-apple text-white text-4xl" />
              <h3 className="font-bold text-white text-base">Apple HomeKit</h3>
              <p className="text-gray-400 text-xs">Sincronización fluida con iOS y Siri local.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-google text-red-400 text-4xl" />
              <h3 className="font-bold text-white text-base">Google Home</h3>
              <p className="text-gray-400 text-xs">Control por voz y gestión multidispositivo.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover-target hover:border-zwol-cyan transition-colors">
              <i className="fa-brands fa-spotify text-green-400 text-4xl" />
              <h3 className="font-bold text-white text-base">Spotify Connect</h3>
              <p className="text-gray-400 text-xs">Audio multizona sincronizado en cada ambiente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 06: LÓGICAS AUTÓNOMAS */}
      <section className="py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-zwol-cyan font-mono text-xs uppercase tracking-widest">06. Rutinas Inteligentes</span>
          <h2 className="font-display font-bold text-white uppercase title-section">
            Lógicas que Trabajan <span className="text-transparent bg-clip-text bg-gradient-to-r from-zwol-cyan to-blue-400">para Ti</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl">
              <i className="fa-solid fa-door-open" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Escenas de Bienvenida</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Al ingresar a la propiedad, el sistema ajusta la iluminación cálida, climatiza los ambientes a la temperatura deseada y reproduce tu lista de reproducción preferida.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl">
              <i className="fa-solid fa-moon" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Ausencia Dinámica</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simulación de presencia orgánica durante viajes. Enciende y apaga luces de forma no repetitiva y mantiene activo el perímetro de videovigilancia con IA.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4 glass-card-hover hover-target">
            <div className="text-zwol-cyan text-3xl">
              <i className="fa-solid fa-leaf" />
            </div>
            <h3 className="font-display font-bold text-white title-card">Eficiencia Energética</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sensores lumínicos y de presencia que desconectan circuitos y climatizadores en zonas desocupadas, reduciendo el consumo eléctrico de forma autónoma.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="border-t border-white/10 bg-zwol-black py-20 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 uppercase tracking-tighter title-hero">
              Eleva tu Propiedad.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Agenda una consulta con nuestra división de ingeniería y transforma tu manera de habitar el espacio.
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenCotizador}
                className="hover-target inline-flex items-center gap-3 px-10 py-5 rounded-full bg-zwol-cyan text-zwol-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)]"
              >
                <i className="fa-solid fa-file-invoice-dollar" />
                Cotizar Instalación
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div>
              <p className="text-white font-bold mb-1">ZWOL-HOME</p>
              <p>Infraestructura Domótica Industrial</p>
              <p>Buenos Aires, ARG</p>
            </div>
            <div className="text-left md:text-center space-y-2">
              <p className="text-white font-bold mb-1">CONTACTO</p>
              <a href={buildWhatsAppLink(contactConfig.phone, contactConfig.whatsappMessage)} target="_blank" rel="noreferrer" className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-brands fa-whatsapp" />  { contactConfig.phoneDisplay}
              </a>
              <a href={`mailto:${contactConfig.email}`} className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-solid fa-envelope" /> {" "} { contactConfig.email}
              </a>
              <Link href={contactConfig.instagramUrl} target="_blank" rel="noreferrer" className="block hover:text-zwol-cyan transition-colors">
                <i className="fa-brands fa-instagram" />  { contactConfig.instagramLabel}
              </Link>
              
            </div>
            <div className="text-left md:text-right">
              <p>&copy; 2026 ZWOL-HOME.</p>
              <p>Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}