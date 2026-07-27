"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030509, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030509, 0);

    const count = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;

      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.15,
      });

      sizes[i] = Math.random() * 2 + 1.2;
      
      // Colores dinámicos: cyan principal con variaciones azul
      const hue = 0.5 + Math.random() * 0.1; // Cyan a blue
      colors[i * 3] = 0.2 + Math.random() * 0.2;     // R
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 1;                          // B
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Crear líneas de conexión (sinapsis/neuronas)
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.3,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.001;

      const pos = pointCloud.geometry.attributes.position.array as Float32Array;
      const sizeAttr = pointCloud.geometry.attributes.size.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        if (Math.abs(pos[i * 3]) > 150) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 150) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 150) velocities[i].z *= -1;

        // Efecto de pulso en el tamaño
        sizeAttr[i] = (Math.random() * 2 + 1.2) * (1 + 0.3 * Math.sin(time * 2 + i * 0.1));
      }
      pointCloud.geometry.attributes.position.needsUpdate = true;
      pointCloud.geometry.attributes.size.needsUpdate = true;

      // Actualizar líneas de conexión (sinapsis) con efecto dinámico
      const linePositions: number[] = [];
      const maxDistance = 70; // Distancia máxima para conectar partículas
      
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
            linePositions.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          }
        }
      }

      if (linePositions.length > 0) {
        lineGeometry.dispose();
        const newLineGeometry = new THREE.BufferGeometry();
        newLineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        lineSegments.geometry = newLineGeometry;
      }

      pointCloud.rotation.y += 0.0005;
      pointCloud.rotation.x += 0.00025;

      // Suavidad mejorada en el seguimiento del mouse
      camera.position.x += ((mouseX - window.innerWidth / 2) * 0.015 - camera.position.x) * 0.04;
      camera.position.y += (-(mouseY - window.innerHeight / 2) * 0.015 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="fixed top-0 left-0 w-screen h-screen z-0 opacity-40 pointer-events-none"
    />
  );
}