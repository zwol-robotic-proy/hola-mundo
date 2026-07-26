import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber"
    ]
  },

  images: {
    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60 * 60 * 24 * 30,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "ayzosnfijbmu3uhn.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com"
      }
    ]
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
};

export default nextConfig;