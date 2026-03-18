"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import { useDeviceTier } from "@/hooks/use-device-tier";

export function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const { isMobile } = useDeviceTier();

  // Motion values for cursor position — no React re-renders on mouse move
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Spring-lagged values for the main blob
  const blobX = useSpring(rawX, { stiffness: 520, damping: 28, mass: 0.2 });
  const blobY = useSpring(rawY, { stiffness: 520, damping: 28, mass: 0.2 });

  // Tight-follow values for the dot
  const dotX = useSpring(rawX, { stiffness: 720, damping: 38, mass: 0.12 });
  const dotY = useSpring(rawY, { stiffness: 720, damping: 38, mass: 0.12 });

  const modeRef = useRef<"default" | "omnitrix">("default");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile || !enabled) return;

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw trail on canvas — zero React state updates
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.alpha *= 0.82;
        const r = 4 * p.alpha;
        if (r < 0.2) { trail.splice(i, 1); i--; continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${p.alpha * 0.65})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const handleMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      modeRef.current = target?.closest("[data-cursor-mode='omnitrix']") ? "omnitrix" : "default";

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 0.7 });
      if (trailRef.current.length > 10) trailRef.current.shift();
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [enabled, isMobile, rawX, rawY]);

  if (isMobile || !enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* Trail drawn on canvas — no React re-renders */}
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      {/* Main cursor blob — driven by motion values, not state */}
      <motion.div
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute h-9 w-9 rounded-full border border-accent/70 bg-accent/10 shadow-glow"
      />

      {/* Dot — tight follow */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute h-2 w-2 rounded-full bg-accent shadow-glow-strong"
      />
    </div>
  );
}
