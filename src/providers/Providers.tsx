"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

function ThemeSync({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("zwol-theme");
    if (!stored) {
      setTheme("dark");
    }
  }, [setTheme]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("light", resolvedTheme === "light");
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme === "light" ? "light" : "dark";
  }, [mounted, resolvedTheme]);

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ThemeSync>
        {children}
        <Toaster richColors position="top-right" />
      </ThemeSync>
    </ThemeProvider>
  );
}