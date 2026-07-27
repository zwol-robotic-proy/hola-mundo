import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.PropsWithChildren<{
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}>;

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  xl: "max-w-[1600px]",
  full: "max-w-none",
};

export function Container({
  size = "lg",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}