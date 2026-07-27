"use client";

interface HomeViewProps {
  onOpenCotizador: () => void;
}

export default function HomeView({ onOpenCotizador }: HomeViewProps) {
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
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-zwol-cyan text-zwol-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(0,210,255,0.3)] inline-flex items-center justify-center gap-3"
              >
                Explorar Ecosistema
                <i className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="#ingenieria"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl glass-panel text-white font-bold text-sm uppercase tracking-wider hover:border-zwol-cyan transition-all inline-flex items-center justify-center"
              >
                Especificaciones ModBus
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="img-container aspect-[4/5] glass-panel p-2 max-w-md mx-auto lg:max-w-none">
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

      {/* TICKER MARQUEE */}
      <div className="border-y border-white/10 bg-zwol-dark/90 py-4 overflow-hidden my-12">
        <div className="animate-marquee whitespace-nowrap font-mono text-xs md:text-sm text-zwol-cyan tracking-widest uppercase flex items-center gap-8">
          <span><i className="fa-solid fa-bolt mr-2" /> Protocolo ModBus TCP-IP</span>
          <span>•</span>
          <span><i className="fa-solid fa-shield-cat mr-2" /> Procesamiento Local First</span>
          <span>•</span>
          <span><i className="fa-solid fa-network-wired mr-2" /> Topología Descentralizada</span>
          <span>•</span>
          <span><i className="fa-solid fa-display mr-2" /> Pantalla Táctil HMI 10"</span>
          <span>•</span>
          <span><i className="fa-solid fa-infinity mr-2" /> Hasta 160 Nodos</span>
        </div>
      </div>
    </div>
  );
}