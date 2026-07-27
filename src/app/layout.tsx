import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, Syne } from "next/font/google";

import "./globals.css";

import { Providers } from "@/providers/Providers";
import { ScrollProgress } from "@/components/hero/ScrollProgress";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zwol-home.com"),

  title: {
    default: "ZWOL-HOME",
    template: "%s | ZWOL-HOME"
  },

  description:
    "Infraestructura domótica industrial basada en ModBus TCP/IP, Home Assistant y automatización residencial premium.",

  keywords: [
    "Domótica",
    "Smart Home",
    "Home Assistant",
    "ModBus",
    "KNX",
    "Industrial Automation",
    "Zwol Home"
  ],

  authors: [
    {
      name: "Ivan Maidana"
    }
  ],

  creator: "Ivan Maidana",

  applicationName: "ZWOL-HOME",

  robots: {
    index: true,
    follow: true
  },

  openGraph: {
    type: "website",

    locale: "es_AR",

    siteName: "ZWOL-HOME",

    title: "ZWOL-HOME",

    description:
      "Infraestructura Domótica Industrial de Alta Gama.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZWOL HOME"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",

    title: "ZWOL-HOME",

    description:
      "Infraestructura Domótica Industrial.",

    images: ["/og-image.jpg"]
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#030509",

  colorScheme: "dark",

  width: "device-width",

  initialScale: 1,

  maximumScale: 1
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html
      lang="es-419"
      suppressHydrationWarning
      className={`${manrope.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body
        className={[
          "bg-[var(--zw-black)]",
          "text-[var(--zw-silver)]",
          "antialiased",
        ].join(" ")}
      >
        <Providers>

          <ScrollProgress />

          {children}

        </Providers>
      </body>
    </html>
  );
}