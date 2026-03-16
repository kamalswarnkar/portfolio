"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useDeviceTier } from "@/hooks/use-device-tier";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
};

export function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const { isMobile, reduceMotion } = useDeviceTier();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mode, setMode] = useState<"default" | "omnitrix">("default");

  useEffect(() => {
    if (isMobile || !enabled) {
      return;
    }

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    let nextId = 0;
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const nextMode = target?.closest("[data-cursor-mode='omnitrix']") ? "omnitrix" : "default";
      setMode(nextMode);

      if (reduceMotion) {
        return;
      }

      setTrail((current) =>
        [...current, { id: nextId++, x: event.clientX, y: event.clientY }].slice(
          -siteConfig.cursorTrailCount.desktop,
        ),
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled, isMobile, reduceMotion]);

  if (isMobile || !enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {trail.map((point) => (
        <motion.span
          key={point.id}
          className="absolute h-2.5 w-2.5 rounded-full bg-accent/70"
          initial={{ x: point.x - 5, y: point.y - 5, opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      <motion.div
        animate={{
          x: position.x - (mode === "omnitrix" ? 118 : 18),
          y: position.y - (mode === "omnitrix" ? 118 : 18),
          width: mode === "omnitrix" ? 236 : 36,
          height: mode === "omnitrix" ? 236 : 36,
          backgroundColor: mode === "omnitrix" ? "rgba(57,255,20,0.22)" : "rgba(57,255,20,0.1)",
          borderColor: mode === "omnitrix" ? "rgba(57,255,20,0.95)" : "rgba(57,255,20,0.7)",
        }}
        transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.2 }}
        className="absolute h-9 w-9 rounded-full border border-accent/70 bg-accent/10 shadow-glow"
        style={{ mixBlendMode: mode === "omnitrix" ? "screen" : "normal" }}
      />
      <motion.div
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: "spring", stiffness: 720, damping: 38, mass: 0.12 }}
        className="absolute h-2 w-2 rounded-full bg-accent shadow-glow-strong"
      />
    </div>
  );
}
