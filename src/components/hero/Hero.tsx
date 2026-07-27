"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

import dynamic from "next/dynamic";
import { ScrollIndicator } from "./ScrollIndicator";

const AnimatedBackground = dynamic(
  () =>
    import("./AnimatedBackground").then(
      (m) => m.AnimatedBackground
    ),
  {
    ssr: false,
  }
);

export function Hero() {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
      "
    >
      <AnimatedBackground />

      {/* Gradient Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/30
          via-black/45
          to-[#030509]
        "
      />

      <Container
        size="xl"
        className="relative z-10"
      >
        <div
          className="
            mx-auto
            max-w-5xl
            text-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
            }}
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-5
              py-2
              text-sm
              text-cyan-300
              backdrop-blur-xl
            "
          >
            <Sparkles className="h-4 w-4" />

            Plataforma Domótica Industrial
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .15,
              duration: .8,
            }}
            className="
              font-display
              text-5xl
              font-black
              leading-none
              tracking-tight
              text-white

              md:text-7xl

              xl:text-8xl
            "
          >
            El futuro del

            <br />

            <span className="gradient-text">
              Smart Home
            </span>

            <br />

            comienza hoy.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .35,
              duration: .8,
            }}
            className="
              mx-auto
              mt-10
              max-w-3xl
              text-lg
              leading-8
              text-slate-300

              md:text-xl
            "
          >
            Infraestructura domótica basada en
            ModBus TCP/IP, Home Assistant y
            automatización industrial para crear
            hogares inteligentes de última
            generación.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .5,
              duration: .8,
            }}
            className="
              mt-14
              flex
              flex-col
              items-center
              justify-center
              gap-5

              sm:flex-row
            "
          >
            <Link href="/cotizador">
              <Button
                size="xl"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Comenzar Proyecto
              </Button>
            </Link>

            <Link href="#concepto">
              <Button
                variant="secondary"
                size="xl"
                leftIcon={<Cpu className="h-5 w-5" />}
              >
                Descubrir Tecnología
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: .8,
            }}
            className="
              mt-24
              grid
              grid-cols-1
              gap-6

              md:grid-cols-3
            "
          >
            {[
              ["100%", "Escalable"],
              ["Industrial", "Arquitectura"],
              ["24/7", "Monitoreo"],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="
                  glass
                  glass-card
                  rounded-3xl
                  p-8
                "
              >
                <h3
                  className="
                    text-3xl
                    font-bold
                    text-cyan-300
                  "
                >
                  {title}
                </h3>

                <p className="mt-2">
                  {subtitle}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
      <ScrollIndicator target="concepto" />
    </section>
  );
}