"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { useDeviceTier } from "@/hooks/use-device-tier";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isMobile, reduceMotion } = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: 0, y: 0 };
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const totalParticles = reduceMotion
      ? Math.max(10, Math.floor(siteConfig.particleCount.mobile / 2))
      : isMobile
        ? siteConfig.particleCount.mobile
        : siteConfig.particleCount.desktop;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      particles = Array.from({ length: totalParticles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22 * siteConfig.animationSpeed,
        vy: (Math.random() - 0.5) * 0.22 * siteConfig.animationSpeed,
        radius: Math.random() * 2.2 + 0.7,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    // Cap particle canvas at 30fps — it's a subtle background, 60fps wastes GPU
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;
    const lineThreshold = isMobile ? 50 : 100;

    const render = (timestamp: number) => {
      animationFrame = window.requestAnimationFrame(render);
      if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = timestamp;

      context.clearRect(0, 0, width, height);

      const glowValues: number[] = [];
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.014;

        if (particle.x < -20 || particle.x > width + 20) particle.vx *= -1;
        if (particle.y < -20 || particle.y > height + 20) particle.vy *= -1;

        if (!reduceMotion && !isMobile) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 160 && distance > 0) {
            particle.x -= (dx / distance) * 0.15;
            particle.y -= (dy / distance) * 0.15;
          }
        }

        glowValues[i] = 0.4 + Math.sin(particle.pulse) * 0.35 * siteConfig.particleGlow;
      }

      // On mobile: no shadow (expensive GPU op) — plain circles only
      if (!isMobile) {
        context.shadowColor = "rgba(57,255,20,0.7)";
        context.shadowBlur = 10;
      }
      context.fillStyle = "rgba(57,255,20,0.85)";
      context.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const r = p.radius + glowValues[i];
        context.moveTo(p.x + r, p.y);
        context.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      context.fill();

      context.shadowBlur = 0;
      context.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          // Use squared distance to skip sqrt when over threshold
          const distSq = dx * dx + dy * dy;
          if (distSq < lineThreshold * lineThreshold) {
            const dist = Math.sqrt(distSq);
            context.beginPath();
            context.strokeStyle = `rgba(57,255,20,${0.12 - dist / 1000})`;
            context.moveTo(p.x, p.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    if (!isMobile) window.addEventListener("pointermove", handlePointer);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, reduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-80" aria-hidden="true" />;
}
