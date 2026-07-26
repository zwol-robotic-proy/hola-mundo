"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/navbar/Logo";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./MobileMenu";

const navigation = [
  {
    label: "Concepto",
    href: "#concepto",
  },
  {
    label: "Ingeniería",
    href: "#ingenieria",
  },
  {
    label: "Control",
    href: "#control",
  },
  {
    label: "Escenarios",
    href: "#escenarios",
  },
  {
    label: "Contacto",
    href: "#contacto",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previous = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 20);

      if (current < 100) {
        setVisible(true);
      } else {
        setVisible(current < previous);
      }

      previous = current;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{
              y: -120,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: -120,
            }}
            transition={{
              duration: 0.35,
            }}
            className={cn(
              "fixed inset-x-0 top-0 z-50 transition-all duration-300",
              isScrolled
                ? "border-b border-white/10 bg-black/45 backdrop-blur-2xl"
                : "bg-transparent"
            )}
          >
            <Container
              className="
                flex
                h-20
                items-center
                justify-between
              "
            >
              <Logo />

              <nav className="hidden items-center gap-8 lg:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      text-sm
                      font-medium
                      text-slate-300
                      transition-colors
                      hover:text-cyan-300
                    "
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden lg:block">
                <Button asChild>
                  <Link href="/cotizador">
                    Cotizar Proyecto
                  </Link>
                </Button>
              </div>

              <button
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
                  lg:hidden
                "
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Container>
          </motion.header>
        )}
      </AnimatePresence>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigation={navigation}
      />
    </>
  );
}