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
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          overflow-visible
          rounded-xl
          border
          border-cyan-300/35
          bg-gradient-to-br
          from-cyan-300/20
          via-cyan-400/5
          to-blue-600/25
          backdrop-blur-xl
          shadow-[0_0_24px_rgba(0,210,255,0.14)]
          ring-1
          ring-inset
          ring-white/10
          transition-shadow
          duration-300
          group-hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]
        "
      >
        <Cpu
          className="
            h-5.5
            w-5.5
            text-cyan-200
            transition-colors
            duration-300
            group-hover:text-white
          "
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span
          className="
            absolute
            -right-1
            -top-1
            h-2.5
            w-2.5
            rounded-full
            border-2
            border-[#030509]
            bg-cyan-300
            shadow-[0_0_10px_rgba(0,210,255,0.9)]
          "
          aria-hidden="true"
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
              text-[1.15rem]
              leading-none
              font-black
              tracking-[0.24em]
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