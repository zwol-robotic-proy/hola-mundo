"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileMenu({
  open,
  onClose,
  navigation,
}: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(value) => !value && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
                className="
                  fixed
                  right-0
                  top-0
                  z-[100]
                  flex
                  h-screen
                  w-full
                  max-w-sm
                  flex-col
                  border-l
                  border-white/10
                  bg-[#060B13]/95
                  backdrop-blur-2xl
                "
              >
                <Container className="flex h-full flex-col py-6">
                  <div className="flex items-center justify-between">
                    <Logo />

                    <button
                      onClick={onClose}
                      aria-label="Cerrar menú"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        transition
                        hover:border-cyan-400/30
                      "
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <nav className="mt-14 flex flex-1 flex-col gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="
                          rounded-xl
                          px-4
                          py-4
                          text-lg
                          font-medium
                          text-slate-300
                          transition-all
                          hover:bg-white/5
                          hover:text-cyan-300
                        "
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-8">
                    <Button
                      asChild
                      className="w-full"
                      size="lg"
                    >
                      <Link
                        href="/cotizador"
                        onClick={onClose}
                      >
                        Cotizar Proyecto
                      </Link>
                    </Button>
                  </div>
                </Container>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}