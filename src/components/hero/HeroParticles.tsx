"use client";

import { useMemo } from "react";
import { Points } from "@react-three/drei";

export function HeroParticles() {
  const positions = useMemo(() => {
    const data = [];

    for (let i = 0; i < 3000; i++) {
      data.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    }

    return new Float32Array(data);
  }, []);

  return (
    <Points
      positions={positions}
      stride={3}
    >
      <pointsMaterial
        transparent
        size={0.035}
        sizeAttenuation
        color="#5EE9FF"
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
}