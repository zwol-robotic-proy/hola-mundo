import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  xl: "max-w-[1600px]",
  full: "max-w-none",
};

export function Container({
  as: Component = "div",
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}