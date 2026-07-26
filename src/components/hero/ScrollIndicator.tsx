"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  target?: string;
}

export function ScrollIndicator({
  target = "concepto",
}: ScrollIndicatorProps) {
  const handleClick = () => {
    const section = document.getElementById(target);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.button
      aria-label="Scroll"
      onClick={handleClick}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1,
        duration: 0.8,
      }}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className={`
        group
        absolute
        bottom-10
        left-1/2
        z-20
        flex
        -translate-x-1/2
        flex-col
        items-center
        gap-3
      `}
    >
      <span
        className={`
          text-xs
          font-medium
          uppercase
          tracking-[0.35em]
          text-slate-400
          transition-colors
          group-hover:text-cyan-300
        `}
      >
        Scroll
      </span>

      <div
        className={`
          flex
          h-14
          w-9
          justify-center
          rounded-full
          border
          border-cyan-400/25
          bg-white/5
          pt-2
          backdrop-blur-xl
        `}
      >
        <motion.div
          animate={{
            y: [0, 18, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className={`
              h-5
              w-5
              text-cyan-300
            `}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}