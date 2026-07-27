"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const animate = () => {
      setOutlinePos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [position]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 hidden md:block ${
          isHovered ? "w-0 h-0 opacity-0" : "w-2.5 h-2.5 bg-zwol-cyan shadow-[0_0_10px_#00d2ff]"
        }`}
        style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
      />
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 border border-zwol-cyan/30 hidden md:block ${
          isHovered
            ? "w-[70px] h-[70px] bg-zwol-cyan/10 backdrop-blur-sm border-zwol-cyan"
            : "w-[40px] h-[40px]"
        }`}
        style={{ transform: `translate(${outlinePos.x}px, ${outlinePos.y}px) translate(-50%, -50%)` }}
      />
    </>
  );
}