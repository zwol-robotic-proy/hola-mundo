"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";

import { HeroParticles } from "./HeroParticles";
import { GradientOrbs } from "./GradientOrbs";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 9]}
            fov={45}
          />

          <color
            attach="background"
            args={["#030509"]}
          />

          <ambientLight intensity={0.35} />

          <directionalLight
            position={[4, 4, 5]}
            intensity={2}
            color="#7dd3fc"
          />

          <Float
            speed={2}
            rotationIntensity={0.4}
            floatIntensity={1.2}
          >
            <HeroParticles />
          </Float>

          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <GradientOrbs />

      <div
        className={[
          "absolute",
          "inset-0",
          "bg-[radial-gradient(circle_at_center,rgba(0,210,255,.12),transparent_70%)]",
        ].join(" ")}
      />

      <div
        className={[
          "absolute",
          "bottom-0",
          "left-0",
          "right-0",
          "h-60",
          "bg-gradient-to-t",
          "from-[#030509]",
          "to-transparent",
        ].join(" ")}
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(0,210,255,.15),transparent_70%)]
        "
      />

      <div
        className="
          absolute
          -top-60
          left-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-[180px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-60
          bg-gradient-to-t
          from-[#030509]
          to-transparent
        "
      />
    </div>
  );
}