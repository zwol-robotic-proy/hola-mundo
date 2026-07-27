"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
  });

  return (
    <>
      {/* Barra superior */}

      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
        }}
        className={[
          "fixed",
          "left-0",
          "top-0",
          "z-[9999]",
          "h-[3px]",
          "w-full",
          "origin-left",
          "bg-gradient-to-r",
          "from-cyan-400",
          "via-sky-400",
          "to-indigo-500",
          "shadow-[0_0_18px_rgba(34,211,238,.55)]",
        ].join(" ")}
      />

      {/* Glow */}

      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
        }}
        className={[
          "fixed",
          "left-0",
          "top-0",
          "z-[9998]",
          "h-[8px]",
          "w-full",
          "origin-left",
          "bg-cyan-400/30",
          "blur-md",
        ].join(" ")}
      />
    </>
  );
}