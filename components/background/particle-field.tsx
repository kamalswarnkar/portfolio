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
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const pointer = { x: 0, y: 0 };
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    const totalParticles = reduceMotion
      ? Math.max(18, Math.floor(siteConfig.particleCount.mobile / 2))
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

    // The particle field uses a single requestAnimationFrame loop to keep motion smooth.
    const render = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.014;

        if (particle.x < -20 || particle.x > width + 20) particle.vx *= -1;
        if (particle.y < -20 || particle.y > height + 20) particle.vy *= -1;

        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 180 && distance > 0 && !reduceMotion) {
          particle.x -= (dx / distance) * 0.18;
          particle.y -= (dy / distance) * 0.18;
        }

        const glow = 0.4 + Math.sin(particle.pulse) * 0.35 * siteConfig.particleGlow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + glow, 0, Math.PI * 2);
        context.fillStyle = `rgba(57,255,20,${0.45 + glow * 0.4})`;
        context.shadowColor = "rgba(57,255,20,0.8)";
        context.shadowBlur = 16;
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (lineDistance < (isMobile ? 96 : 128)) {
            context.beginPath();
            context.strokeStyle = `rgba(57,255,20,${0.12 - lineDistance / 1200})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, reduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-80" aria-hidden="true" />;
}
