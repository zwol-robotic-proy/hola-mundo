"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-full",
    "font-semibold",
    "transition-all",
    "duration-300",
    "select-none",
    "outline-none",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:ring-2",
    "focus-visible:ring-cyan-400",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-black",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r",
          "from-cyan-400",
          "to-blue-500",
          "text-black",
          "shadow-lg",
          "shadow-cyan-500/20",
          "hover:-translate-y-1",
          "hover:shadow-cyan-400/40",
        ],

        secondary: [
          "glass",
          "border",
          "border-white/10",
          "text-white",
          "hover:border-cyan-400/40",
          "hover:bg-white/5",
        ],

        ghost: [
          "text-slate-300",
          "hover:bg-white/5",
          "hover:text-white",
        ],

        outline: [
          "border",
          "border-cyan-500/30",
          "text-cyan-300",
          "hover:bg-cyan-500/10",
        ],

        danger: [
          "bg-red-600",
          "text-white",
          "hover:bg-red-500",
        ],
      },

      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-12 w-12",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </Component>
  );
}

export { buttonVariants };