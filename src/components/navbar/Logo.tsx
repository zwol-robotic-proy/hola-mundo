"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  showText?: boolean;
  compact?: boolean;
  className?: string;
}

export function Logo({
  href = "/",
  showText = true,
  compact = false,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="ZWOL HOME"
      className={cn(
        "group inline-flex items-center gap-3 select-none",
        className
      )}
    >
      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-cyan-400/20
          bg-gradient-to-br
          from-cyan-400/15
          to-blue-600/20
          backdrop-blur-xl
          shadow-lg
          shadow-cyan-500/10
        "
      >
        <Cpu
          className="
            h-6
            w-6
            text-cyan-300
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />
      </motion.div>

      {!compact && showText && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .35 }}
          className="flex flex-col"
        >
          <span
            className="
              text-xl
              font-black
              tracking-[0.2em]
              text-white
            "
          >
            ZWOL
          </span>

          <span
            className="
              -mt-1
              text-xs
              uppercase
              tracking-[0.35em]
              text-cyan-300
            "
          >
            HOME
          </span>
        </motion.div>
      )}
    </Link>
  );
}