import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, Syne } from "next/font/google";

import "./globals.css";

import { Providers } from "@/providers/Providers";
import { ScrollProgress } from "@/components/hero/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${manrope.variable} ${syne.variable} ${spaceGrotesk.variable} antialiased selection:bg-zwol-cyan selection:text-black font-sans`}
      >
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}