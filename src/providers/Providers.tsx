"use client";

import { Toaster } from "sonner";

import { ThemeProvider } from "./ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}

      <Toaster
        richColors
        expand
        closeButton
        position="top-right"
        duration={4000}
        visibleToasts={4}
        toastOptions={{
          classNames: {
            toast:
              "glass border border-cyan-500/20 bg-[#111726]/90 text-slate-200 backdrop-blur-xl",
            title: "font-semibold",
            description: "text-slate-400"
          }
        }}
      />
    </ThemeProvider>
  );
}