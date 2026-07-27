"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <>
      {/* Orb Superior */}

      <motion.div
        animate={{
          x: [-80, 120, -80],
          y: [-50, 80, -50],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={[
          "pointer-events-none",
          "absolute",
          "-top-64",
          "left-1/2",
          "-translate-x-1/2",
          "h-[750px]",
          "w-[750px]",
          "rounded-full",
          "bg-cyan-500/20",
          "blur-[180px]",
          "will-change-transform",
        ].join(" ")}
      />

      {/* Orb Izquierdo */}

      <motion.div
        animate={{
          x: [-40, 60, -40],
          y: [20, -60, 20],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={[
          "pointer-events-none",
          "absolute",
          "left-[-220px]",
          "top-1/3",
          "h-[520px]",
          "w-[520px]",
          "rounded-full",
          "bg-blue-600/15",
          "blur-[170px]",
          "will-change-transform",
        ].join(" ")}
      />

      {/* Orb Derecho */}

      <motion.div
        animate={{
          x: [40, -70, 40],
          y: [-40, 70, -40],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={[
          "pointer-events-none",
          "absolute",
          "right-[-240px]",
          "bottom-0",
          "h-[650px]",
          "w-[650px]",
          "rounded-full",
          "bg-indigo-500/15",
          "blur-[190px]",
          "will-change-transform",
        ].join(" ")}
      />

      {/* Glow Central */}

      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={[
          "pointer-events-none",
          "absolute",
          "left-1/2",
          "top-1/2",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "h-[500px]",
          "w-[500px]",
          "rounded-full",
          "bg-cyan-400/10",
          "blur-[140px]",
        ].join(" ")}
      />
    </>
  );
}